import type { Model } from "mongoose";
import type { HydratedDocument } from "mongoose";
import type mongoose from "mongoose";

/**
 * - Enum for Account status
 * - status : active , frozen , closed
 */
export enum EStatus {
    ACTIVE = "ACTIVE",
    FROZEN = "FROZEN",
    CLOSED = "CLOSED",
}

/**
 * - interface Account Model
 * - required : user , status , currency
 * - optional : string
 */
export interface IAccountModel {
    _id?: string,
    user: mongoose.Types.ObjectId,
    status: EStatus,
    currency: string
}

/**
 * - for access getBalance in controller
 */
export interface IAccountMethods {
  getBalance(): Promise<number>;
}

// ✅ (Optional but best) Strong doc/model types
export type AccountDoc = HydratedDocument<IAccountModel, IAccountMethods>;
export type AccountModel = Model<IAccountModel, {}, IAccountMethods>;

export type AuthTokenPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};