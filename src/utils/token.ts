import jwt from "jsonwebtoken";
import { Enviroments } from "../config/enviroments";
import { ErrorException } from "../web/exceptions/ErrorException";

export function GenerateToken(registration: string, role: string) {
  const { jwt_key } = new Enviroments();
  return jwt.sign({ registration, role }, jwt_key, {
    expiresIn: "1d",
  });
}

export function ValidateToken(token: string): {
  registration: string;
  role: "adm" | "operator" | "tecnico";
} {
  try {
    const { jwt_key } = new Enviroments();
    return jwt.verify(token, jwt_key) as {
      registration: string;
      role: "adm" | "operator" | "tecnico";
    };
  } catch (err) {
    throw new ErrorException("Token inválido", 401);
  }
}
