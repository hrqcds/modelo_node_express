import { Router } from "express";
import { authRouter } from "./auth.routes";
import { userRouter } from "./user.routes";

export class ServerRoutes {
  public start() {
    const router = Router({
      strict: true,
    });

    router.get("/health-check", (_, res) =>
      res.status(200).json({
        message: "O Servidor está online",
      }),
    );

    router.use(authRouter);
    router.use(userRouter);

    return router;
  }
}
