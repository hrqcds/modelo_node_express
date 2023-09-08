import "dotenv/config";
import "reflect-metadata";
import "./shared/container";
import "express-async-errors";
import { Enviroments } from "./config/enviroments";
import { Server } from "./web/server";

const { port } = new Enviroments();
new Server(port).start().catch((e) => console.error(e));
