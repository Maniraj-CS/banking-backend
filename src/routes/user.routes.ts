import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";


const userRouter = Router()


userRouter.route("/register").post(userRegister)
userRouter.route("/login").post(userLogin)
userRouter.route("/logout").post(isAuth , userLogout)


export default userRouter