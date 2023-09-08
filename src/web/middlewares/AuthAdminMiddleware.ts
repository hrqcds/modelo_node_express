import { NextFunction, Request, Response } from "express";
import { ValidateToken } from "../../utils/token";
import { ErrorException } from "../exceptions/ErrorException";

export class AuthAdminMiddleware {
  public static handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      throw new ErrorException("Token não informado", 401);
    }

    const [_, bearer] = token.split(" ");
    if (!bearer) {
      throw new ErrorException("Token não informado", 401);
    }

    const { role } = ValidateToken(bearer);

    if (role !== "adm") {
      throw new ErrorException("Você não tem permissão para acessar essa rota", 403);
    }

    next();
  }
}
