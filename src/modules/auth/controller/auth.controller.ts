import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { registration, password } = req.body;

    const authService = container.resolve(AuthService);

    const auth = await authService.execute({
      registration,
      password,
    });

    return res.status(200).json(auth);
  }
}
