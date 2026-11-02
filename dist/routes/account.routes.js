import { Router } from "express";
import { creatAccount, getUserAllAccount, getUserAccountBalance, getAllAccount } from "../controllers/account.controller.js";
import { isAuth, isSystemUser } from "../middleware/auth.middleware.js";
const accountRouter = Router();
accountRouter.route("/").post(isAuth, creatAccount);
accountRouter.route("/").get(isAuth, getUserAllAccount);
accountRouter.route("/balance/:accountId").get(isAuth, getUserAccountBalance);
accountRouter.route("/admin").get(isSystemUser, getAllAccount);
export default accountRouter;
//# sourceMappingURL=account.routes.js.map