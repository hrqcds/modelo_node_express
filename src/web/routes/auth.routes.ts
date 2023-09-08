import { Router } from "express";
import { AuthController } from "../../modules/auth/controller/auth.controller";

const authRouter = Router();

authRouter.post("/auth", AuthController.handle);

export { authRouter };
