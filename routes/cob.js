import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.js";
import { CobController }from "../controllers/cob.js"

const router = Router();

const authMiddleware = new AuthMiddleware();
const cobController = new CobController();


router.get("/hello",authMiddleware.verifyUserToken,cobController.hello);

router.post('/',authMiddleware.verifyUserToken,cobController.cobPixImediate);

export default router;