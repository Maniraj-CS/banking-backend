import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import tokenBlackListModel from "../models/blacklist.model.js";
export function getToken(req) {
    // ✅ cookie name must match what you set in login: "jwt_token"
    const cookieToken = req.cookies?.jwt_token;
    const header = req.headers.authorization;
    const bearerToken = header?.startsWith("Bearer ") ? header.split(" ")[1] : undefined;
    return cookieToken || bearerToken || null;
}
async function isAuth(req, res, next) {
    try {
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: token missing",
            });
        }
        const isBlackListed = await tokenBlackListModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({
                message: "Unauthorized: invalid token payload",
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // ✅ production-safe: server misconfigured
            return res.status(500).json({
                message: "Server error: JWT secret not configured",
            });
        }
        const decoded = jwt.verify(token, secret);
        if (!decoded?.userId) {
            return res.status(401).json({
                message: "Unauthorized: invalid token payload",
            });
        }
        req.userId = decoded.userId;
        return next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, token in Invalid"
        });
    }
}
async function isSystemUser(req, res, next) {
    const token = getToken(req);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: token missing",
        });
    }
    const isBlackListed = await tokenBlackListModel.findOne({ token });
    if (isBlackListed) {
        return res.status(401).json({
            message: "Unauthorized: invalid token payload",
        });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            // ✅ production-safe: server misconfigured
            return res.status(500).json({
                message: "Server error: JWT secret not configured",
            });
        }
        const decoded = jwt.verify(token, secret);
        if (!decoded?.userId) {
            return res.status(401).json({
                message: "Unauthorized: invalid token payload",
            });
        }
        const user = await userModel.findById(decoded.userId).select("+systemUser");
        if (!user?.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user",
            });
        }
        req.userId = user._id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, token in Invalid"
        });
    }
}
export { isAuth, isSystemUser };
//# sourceMappingURL=auth.middleware.js.map