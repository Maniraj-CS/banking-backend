import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../utils/types/user.types.js";
export declare function getToken(req: AuthRequest): string | null;
declare function isAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
declare function isSystemUser(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export { isAuth, isSystemUser };
//# sourceMappingURL=auth.middleware.d.ts.map