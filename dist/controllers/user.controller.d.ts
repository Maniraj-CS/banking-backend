import type { Request, Response } from "express";
import type { AuthRequest } from "../utils/types/user.types.js";
/**
 * - userRegister route
 * - url : /api/v1/auth/register
 * - method : POST
 */
declare const userRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const userLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const userLogout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { userRegister, userLogin, userLogout };
//# sourceMappingURL=user.controller.d.ts.map