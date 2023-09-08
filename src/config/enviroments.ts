export class Enviroments {
  public port: number;
  public jwt_key: string;

  constructor() {
    this.port = Number(process.env.SERVER_PORT) ?? 3000;
    this.jwt_key = process.env.JWT_KEY ?? "secret";
  }
}
