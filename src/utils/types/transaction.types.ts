import type mongoose from "mongoose";


export enum ETransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REVERSED = "REVERSED",
}

export interface ITransactionModel {
  _id?: string;
  fromAccount: mongoose.Types.ObjectId;
  toAccount: mongoose.Types.ObjectId;
  status: ETransactionStatus;
  amount: number;
  idempotencyKey: string;
}