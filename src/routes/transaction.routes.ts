import { Router } from "express";


import {isAuth, isSystemUser} from "../middleware/auth.middleware.js";
import { createInitialFundsTransaction, createTransaction } from "../controllers/transaction.controller.js";


const transactionRouter = Router()


transactionRouter.route("/").post(isAuth , createTransaction  )
transactionRouter.route("/system/initial-fund").post( isSystemUser, createInitialFundsTransaction  )



export default transactionRouter