import type { Response } from "express";
import type { AuthRequest } from "../utils/types/user.types.js";
declare function createTransaction(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function createInitialFundsTransaction(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export { createTransaction, createInitialFundsTransaction };
//# sourceMappingURL=transaction.controller.d.ts.map