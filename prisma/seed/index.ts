import { PrismaClient } from "@prisma/client";
import { UserSeed } from "./user.seed";

async function Seeds() {
  const conn = new PrismaClient();
  await UserSeed(conn);
}
Seeds().catch((e) => console.error(e));
