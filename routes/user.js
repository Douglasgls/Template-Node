import { Router } from "express"
import { UserController } from "../controllers/user.js";
import { AuthMiddleware } from "../middleware/auth.js";

const router = Router();
const userController = new UserController();

const authMiddleware = new AuthMiddleware();

router.get('/hello',userController.hello);

router.post('/',userController.profile);

router.put('/',userController.updateProfile);

router.get('/',authMiddleware.handlerRoleADMIN,userController.AllUsers);

export default router;