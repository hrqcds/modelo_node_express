import { Router } from "express";
import { CreateUserController } from "../../modules/user/controllers/create.controller";
import { ListUserController } from "../../modules/user/controllers/list.controller";

const userRouter = Router({
  strict: true,
});

userRouter.post("/users", CreateUserController.handle);
userRouter.get("/users", ListUserController.handle);

export { userRouter };
