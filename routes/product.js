import { Router } from "express";
import { ProductController } from "../controllers/product.js";
import { AuthMiddleware } from "../middleware/auth.js";

const router = Router();

const productController = new ProductController();
const authMiddleware = new AuthMiddleware();

router.get('/hello',productController.hello);

router.get('/',productController.allProduct);

router.get('/:id',productController.findById);

router.patch('/:id',authMiddleware.handlerRoleADMIN ,productController.updateProduct);

router.delete('/:id',authMiddleware.handlerRoleADMIN ,productController.deleteProduct);

router.post('/',authMiddleware.handlerRoleADMIN ,productController.createdProduct);


export default router;