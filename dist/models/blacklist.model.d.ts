import mongoose from "mongoose";
import type { IBlackListModel } from "../utils/types/blacklist.types.js";
declare const tokenBlackListModel: mongoose.Model<IBlackListModel, {}, {}, {}, mongoose.Document<unknown, {}, IBlackListModel, {}, mongoose.DefaultSchemaOptions> & IBlackListModel & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IBlackListModel>;
export default tokenBlackListModel;
//# sourceMappingURL=blacklist.model.d.ts.map