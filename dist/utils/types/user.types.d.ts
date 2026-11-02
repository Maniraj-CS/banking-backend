import type { Request } from "express";
/**
* - user Model interface
* - required : email and name
* - optional : password and _id
*/
export interface IUserModel {
    _id?: string;
    email: string;
    name: string;
    password?: string;
    systemUser?: boolean;
}
export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}
/**
 * - AuthRequest interface
 * - userId (optional fild) & { ...Request }
 */
export interface AuthRequest extends Request {
    userId?: string;
}
//# sourceMappingURL=user.types.d.ts.map