import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../services/create.service";

export class CreateUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, registration, control, password, profile, role } = req.body;

    const service = container.resolve(CreateUserService);

    const result = await service.execute({
      name,
      registration,
      control,
      password,
      profile,
      role,
    });

    return res.status(201).json(result);
  }
}
