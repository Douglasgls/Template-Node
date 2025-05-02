import utils from "../utils/auth.js";
import User from "../models/users.js";

export class AuthMiddleware{
    async handlerRoleADMIN(req, res, next) {
        const user = await utils.getUserFromRequest(req);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        
        if(user.position !== 'ADMIN'){
            return res.status(401).json({ message: "Not Authorized" });
        }
        
        next();
    }

    async verifyUserToken(req, res, next) {
        const user = await utils.getUserFromRequest(req);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const userDb = await User.findOne({
            attributes: ['id'],
            where: { email: user.email }
        })

        req.user = userDb
        next();
    }
        
}