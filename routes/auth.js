import { Router } from "express"
import { AuthController } from "../controllers/auth.js";

const router = Router();
const authController = new AuthController();

router.get('/hello',authController.hello);

router.post('/registerUser',authController.registerUser);

router.post('/login',authController.login);

router.get('/refreshToken', authController.refreshToken);

export default router;