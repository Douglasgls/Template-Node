import { Router } from "express"
import { UserController } from "../controllers/user.js";
import { AuthMiddleware } from "../middleware/auth.js";

const router = Router();
const userController = new UserController();

const authMiddleware = new AuthMiddleware();

router.get('/hello',userController.hello);

router.get('/profile',userController.profile);

router.put('/profile',userController.updateProfile); // LEMBRAR DE ATUALIZAR O EMAIL NO TOKEN

router.get('/allUsers',authMiddleware.handlerRoleADMIN,userController.AllUsers);

export default router;