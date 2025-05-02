import { Router } from "express"
import { CartController } from "../controllers/cart.js";
import { AuthMiddleware } from "../middleware/auth.js";

const router = Router();
const cartController = new CartController();
const authMiddleware = new AuthMiddleware();

router.get('/hello',cartController.hello);

router.get('/',authMiddleware.verifyUserToken,cartController.allCart);

router.post('/:id',authMiddleware.verifyUserToken,cartController.addItemToCart);

router.delete('/',authMiddleware.verifyUserToken,cartController.removeItemFromCart);

router.delete('/clear',authMiddleware.verifyUserToken,cartController.clearCart);

router.patch('/',authMiddleware.verifyUserToken,cartController.quantityUpdate);

export default router;
