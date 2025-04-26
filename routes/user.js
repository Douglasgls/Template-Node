import { Router } from "express"
import { UserController } from "../controllers/user.js";

const router = Router();
const userController = new UserController();

router.get('/hello',userController.hello);

export default router;