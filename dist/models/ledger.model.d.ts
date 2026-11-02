import mongoose from "mongoose";
import { type ILedgerModel } from "../utils/types/ledger.types.js";
declare const ledgerModel: mongoose.Model<ILedgerModel, {}, {}, {}, mongoose.Document<unknown, {}, ILedgerModel, {}, mongoose.DefaultSchemaOptions> & ILedgerModel & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILedgerModel>;
export default ledgerModel;
//# sourceMappingURL=ledger.model.d.ts.map