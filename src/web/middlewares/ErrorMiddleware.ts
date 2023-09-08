import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorException } from "../exceptions/ErrorException";

export class ErrorMiddleware {
  public static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ErrorException) {
      res.status(err.status).json({
        message: err.message,
      });
      return next();
    }

    if (err instanceof ZodError) {
      res.status(400).json({
        message: "Erro de validação",
        errors: err.formErrors.fieldErrors,
      });
      return next();
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
      res.status(400).json({
        message: "Erro na comunicação com o banco de dados",
      });
      return next();
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({
        message: "Erro ao salvar no banco de dados",
      });
      return next();
    }

    res.status(500).json({
      message: "Erro interno no servidor",
    });

    return next();
  }
}
