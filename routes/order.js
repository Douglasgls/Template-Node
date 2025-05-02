import { Router } from "express";
import { OrderController } from "../controllers/order.js";
import { AuthMiddleware } from "../middleware/auth.js";

const router = Router();
const orderController = new OrderController();
const authMiddleware = new AuthMiddleware();

router.get('/hello',authMiddleware.verifyUserToken,orderController.hello);

router.post('/',authMiddleware.verifyUserToken,orderController.checkout);

router.get('/:id',authMiddleware.verifyUserToken,orderController.OrderItems);

export default router;