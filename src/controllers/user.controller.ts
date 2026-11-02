import type { Request, Response } from "express"
import userModel from "../models/user.models.js"
import jwt from "jsonwebtoken"
import type { AuthRequest } from "../utils/types/user.types.js"
import { getToken } from "../middleware/auth.middleware.js"
import tokenBlackListModel from "../models/blacklist.model.js"

/**
 * - userRegister route
 * - url : /api/v1/auth/register
 * - method : POST
 */
const userRegister = async (req: Request, res: Response) => {

    const { email, name, password } = req.body

    const isExist = await userModel.findOne({ email })

    if (isExist) {
        return res.status(422).json({
            message: "User already exists with email",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email,
        name,
        password
    })

    const token = jwt.sign({
        userId: user._id
    },
        process.env.JWT_SECRET as string,
        { expiresIn: "3d" }
    )

    res.cookie("jwt_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    })

    if (user.systemUser !== false) {

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isSystemUser: user.systemUser
            },
            token,
        })

    } else {

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        })

    }

}


const userLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or Password is INVALID",
            status: "failed"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or Password is INVALID",
            status: "failed"
        })
    }

    const token = jwt.sign({
        userId: user._id
    },
        process.env.JWT_SECRET as string,
        { expiresIn: "3d" }
    )

    res.cookie("jwt_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
    })


    if (user.systemUser !== false) {

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isSystemUser: user.systemUser
            },
            token,
        })

    } else {

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        })

    }
}

const userLogout = async (req: AuthRequest, res: Response) => {
    const token = getToken(req)

    if (!token) {
        return res.status(400).json({
            message: "User logout successfully"
        })
    }


    await tokenBlackListModel.create({
        token
    })

    res.clearCookie("jwt_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    });

    res.status(200).json({
        message: "User logged out successfully"
    })
}


export {
    userRegister,
    userLogin,
    userLogout
}