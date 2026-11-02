import type { Response } from "express";
import type { AuthRequest } from "../utils/types/user.types.js";
import accountModel from "../models/account.model.js";
import transactionModel from "../models/transaction.model.js";
import ledgerModel from "../models/ledger.model.js";
import mongoose from "mongoose";
import { ETransactionStatus } from "../utils/types/transaction.types.js";
import userModel from "../models/user.models.js";

 async function createTransaction(req: AuthRequest, res: Response) {
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  // ✅ input validation
  if (!fromAccount || !toAccount || !idempotencyKey) {
    return res.status(400).json({
      message: "fromAccount, toAccount and idempotencyKey are required",
    });
  }

  if (amount == null || typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "Amount must be a number greater than 0" });
  }

  // ✅ Fetch accounts in parallel
  const [fromUserAccount, toUserAccount] = await Promise.all([
    accountModel.findById(fromAccount),
    accountModel.findById(toAccount),
  ]);

  if (!fromUserAccount || !toUserAccount) {
    return res.status(400).json({ message: "Invalid fromAccount or toAccount" });
  }

  // ✅ idempotency quick check (fast path)
  const existing = await transactionModel.findOne({ idempotencyKey });
  if (existing) {
    if (existing.status === ETransactionStatus.SUCCESS) {
      return res.status(200).json({ message: "Transaction already processed", transaction: existing });
    }
    if (existing.status === ETransactionStatus.PENDING) {
      return res.status(200).json({ message: "Transaction is still processing" });
    }
    return res.status(409).json({
      message: `Transaction cannot be retried with same idempotencyKey. Current status: ${existing.status}`,
    });
  }

  // ✅ account status check
  if (fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
    return res.status(400).json({ message: "Both accounts must be ACTIVE to process transaction" });
  }

  // ✅ balance check
  const balance = await fromUserAccount.getBalance();
  if (balance < amount) {
    return res.status(400).json({
      message: `Insufficient balance. Current balance: ${balance}. Requested: ${amount}`,
    });
  }

  const session = await mongoose.startSession();
  let transactionId: string | null = null;

  try {
    session.startTransaction();

    // ✅ Create transaction
    const transaction = new transactionModel(
        {
          fromAccount,
          toAccount,
          amount,
          idempotencyKey,
          status: ETransactionStatus.PENDING,
        },
    );

    await transaction.save({ session })

    if (!transaction) throw new Error("Transaction creation failed");
    transactionId = transaction._id.toString();

    // ✅ Create both ledger entries in ONE call
    await ledgerModel.create(
      [
        { account: fromAccount, amount, transaction: transaction._id, type: "DEBIT" },
        { account: toAccount, amount, transaction: transaction._id, type: "CREDIT" },
      ],
      { session , ordered: true }
    );

    // ✅ Mark success
    transaction.status = ETransactionStatus.SUCCESS;
    await transaction.save({ session });

    await session.commitTransaction();

    // ✅ Respond first (don’t block user for email)
    res.status(200).json({
      message: `Payment successful: ${amount} NRS`, 
      transactionId,
    });

    const user = await userModel.findById(req.userId)

    if(!user){
       return
    }

    return res.status(200).json( {
       userEmail: user.email,
       name: user.name,
       amount,
       toAccount
    } )
    
  } catch (err: any) {
    await session.abortTransaction();

    // ✅ Handle idempotency race (duplicate key)
    if (err?.code === 11000) {
      const tx = await transactionModel.findOne({ idempotencyKey });
      return res.status(200).json({ message: "Transaction already processed", transaction: tx });
    }

    return res.status(500).json({
      message: "Transaction failed",
      error: err?.message ?? "Unknown error",
    });
  } finally {
    session.endSession();
  }
}

async function createInitialFundsTransaction(
  req : AuthRequest,
  res: Response
){

  const { toAccount , amount , idempotencyKey } = req.body
    // ✅ input validation
  if ( !toAccount || !idempotencyKey) {
    return res.status(400).json({
      message: "toAccount and idempotencyKey are required",
    });
  }

  if (amount == null || typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "Amount must be a number greater than 0" });
  }

   const toUserAccount = await accountModel.findById(toAccount)

   if(!toUserAccount){
     return res.status(400).json({
      message:"Invalid toAccount"
     })
   }

   const systemUserId = req.userId

   if(!systemUserId){
     return res.status(500).json({
				message: "Token is missing",
			});
   }

   const fromUserAccount = await accountModel.findOne({
     user: systemUserId
   })

   if(!fromUserAccount){
     return res.status(400).json({
      message:`System user account not found`
     })
   }

   const session = await mongoose.startSession();
   let transactionId: string | null = null;

  try {
    session.startTransaction();

    // ✅ Create transaction
    const transaction = new transactionModel(
        {
          fromAccount : fromUserAccount._id,
          toAccount,
          amount,
          idempotencyKey,
          status: ETransactionStatus.PENDING,
        },
    );

    await transaction.save({ session })

    if (!transaction) throw new Error("Transaction creation failed");
    transactionId = transaction._id.toString();

    // ✅ Create both ledger entries in ONE call
    await ledgerModel.create(
      [
        { account: fromUserAccount._id, amount, transaction: transaction._id, type: "DEBIT" },
        { account: toAccount, amount, transaction: transaction._id, type: "CREDIT" },
      ],
      { session , ordered: true }
    );

    // ✅ Mark success
    transaction.status = ETransactionStatus.SUCCESS;
    await transaction.save({ session });

    await session.commitTransaction();

    // ✅ Respond first (don’t block user for email)
    res.status(200).json({
      message: `Payment successful: ${amount} NRS`, 
      transactionId,
    });

    const user = await userModel.findById(req.userId)

    if(!user){
       return
    }

    return res.status(200).json( {
       userEmail: user.email,
       name: user.name,
       amount,
       toAccount
       });
       
  } catch (err: any) {
    await session.abortTransaction();

    // ✅ Handle idempotency race (duplicate key)
    if (err?.code === 11000) {
      const tx = await transactionModel.findOne({ idempotencyKey });
      return res.status(200).json({ message: "Transaction already processed", transaction: tx });
    }

    return res.status(500).json({
      message: "Transaction failed",
      error: err?.message ?? "Unknown error",
    });
  } finally {
    session.endSession();
  }
}

export {
  createTransaction,
  createInitialFundsTransaction
}
