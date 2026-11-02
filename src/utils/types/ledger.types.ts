import type mongoose from "mongoose";

export enum ELedgerType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export interface ILedgerModel {
  _id?: string;
  account: mongoose.Types.ObjectId;
  transaction: mongoose.Types.ObjectId;
  amount: number;
  type: ELedgerType;
}