import mongoose from "mongoose";
import { type ITransactionModel } from "../utils/types/transaction.types.js";
declare const transactionModel: mongoose.Model<ITransactionModel, {}, {}, {}, mongoose.Document<unknown, {}, ITransactionModel, {}, mongoose.DefaultSchemaOptions> & ITransactionModel & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITransactionModel>;
export default transactionModel;
//# sourceMappingURL=transaction.model.d.ts.map