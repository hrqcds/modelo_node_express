import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/doc.json";
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware";
import { ServerRoutes } from "./routes/index.routes";

export class Server {
  public port: number;

  constructor(port: number) {
    this.port = port;
  }

  public async start(): Promise<void> {
    const server = express();

    server.use(express.json());
    server.use(morgan("combined"));
    server.use(cors());

    server.use(new ServerRoutes().start());
    server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    server.use(ErrorMiddleware.handle);

    server.listen(this.port, () => {
      console.log(`Servidor está rodando na porta: ${this.port}`);
      console.log(`Acesse: http://127.0.0.1:${this.port}`);
    });
  }
}
