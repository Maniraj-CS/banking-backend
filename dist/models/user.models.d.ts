import mongoose from "mongoose";
import type { IUserMethods, IUserModel } from "../utils/types/user.types.js";
/**
 * - userModel params
 * - required : email , name and password
*/
declare const userModel: mongoose.Model<IUserModel, {}, IUserMethods, {}, mongoose.Document<unknown, {}, IUserModel, {}, mongoose.DefaultSchemaOptions> & Omit<IUserModel & Required<{
    _id: string;
}> & {
    __v: number;
}, "comparePassword"> & IUserMethods, any, IUserModel>;
export default userModel;
//# sourceMappingURL=user.models.d.ts.map