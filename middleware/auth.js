import utils from "../utils/auth.js";

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
}