import type { Response } from "express";
import type { AuthRequest } from "../utils/types/user.types.js";
import accountModel from "../models/account.model.js";


const creatAccount = async (req: AuthRequest, res: Response) => {

    const id = req.userId

    if (!id) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const account = await accountModel.create({
        user: id
    })

    res.status(201).json({
        account
    })
}

const getUserAllAccount = async (req: AuthRequest, res: Response) => {

    const userId = req.userId

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const account = await accountModel.find({
        user: userId
    })

    if (!account) {
        return res.status(401).json({
            message: "No account found"
        })
    }

    return res.status(200).json({
        account
    })
}

const getUserAccountBalance = async (req: AuthRequest, res: Response) => {

    const accountId = req.params.accountId

    if (!accountId) {
        return res.status(401).json({
            message: "Account id is missing"
        })
    }

    const userId = req.userId

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const account = await accountModel.findOne({
        _id: accountId,
        user: userId
    })

    if (!account) {
        return res.status(401).json({
            message: "No account found"
        })
    }

    const balance = await account.getBalance()

    return res.status(200).json({
        account,
        balance
    })
}

const getAllAccount = async (req: AuthRequest, res: Response) => {

    const userId = req.userId

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    const accounts = await accountModel.find()

   return res.status(200).json({
     accounts
   })

}



export {
    creatAccount,
    getUserAllAccount,
    getUserAccountBalance,
    getAllAccount
}