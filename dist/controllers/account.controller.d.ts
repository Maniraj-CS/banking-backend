import type { Response } from "express";
import type { AuthRequest } from "../utils/types/user.types.js";
declare const creatAccount: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getUserAllAccount: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getUserAccountBalance: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllAccount: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export { creatAccount, getUserAllAccount, getUserAccountBalance, getAllAccount };
//# sourceMappingURL=account.controller.d.ts.map