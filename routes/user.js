import { Router } from "express"
import { UserController } from "../controllers/user.js";
import { UserMiddleware } from "../middleware/user.js";

const router = Router();
const userController = new UserController();

const userMiddleware = new UserMiddleware();

router.get('/hello',userController.hello);

router.get('/profile',userController.profile);

router.put('/profile',userController.updateProfile);

router.get('/allUsers',userMiddleware.handlerRoleADMIN,userController.AllUsers);

export default router;