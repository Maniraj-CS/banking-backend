import mongoose from "mongoose";
import { ETransactionStatus, type ITransactionModel } from "../utils/types/transaction.types.js";



const transactionSchema = new mongoose.Schema<ITransactionModel>(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "fromAccount is required"],
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: [true, "toAccount is required"],
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(ETransactionStatus),
      required: true,
      default: ETransactionStatus.PENDING,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
      min: [0.01, "amount must be greater than 0"],
    },
    idempotencyKey: {
      type: String,
      required: [true, "idempotencyKey is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// ✅ idempotency: same request not repeated duplicate transaction not created
transactionSchema.index({ idempotencyKey: 1 }, { unique: true });

// ✅ Useful query index (from -> status -> createdAt)
transactionSchema.index({ fromAccount: 1, status: 1, createdAt: -1 });

// ✅ Validation: fromAccount and toAccount not be same
transactionSchema.pre("validate", function () {
  if (
    this.fromAccount &&
    this.toAccount &&
    this.fromAccount.toString() === this.toAccount.toString()
  ) {
    throw new Error("fromAccount and toAccount must be different");
  }

});

const transactionModel = mongoose.model<ITransactionModel>(
  "transaction",
  transactionSchema
);

export default transactionModel;
