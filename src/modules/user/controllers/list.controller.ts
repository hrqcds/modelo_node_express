import { Request, Response } from "express";
import { container } from "tsyringe";
import { QueryUserDto } from "../dtos/query";
import { ListUserService } from "../services/list.service";

export class ListUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const query = req.query as unknown as QueryUserDto;

    const service = container.resolve(ListUserService);
    const result = await service.execute(query);

    return res.status(200).json(result);
  }
}
