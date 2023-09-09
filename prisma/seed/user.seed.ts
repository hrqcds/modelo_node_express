import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export async function UserSeed(conn: PrismaClient) {
  try {
    const password = await bcrypt.hash("admin", 10);
    await conn.$connect();
    const adminiExist = await conn.user.findFirst({
      where: {
        registration: "admin",
      },
    });
    if (!adminiExist) {
      await conn.user.create({
        data: {
          name: "admin",
          registration: "admin",
          control: "admin",
          profile: "admin",
          role: "adm",
          password,
        },
      });
    }
    console.log("Seed de usuários rodado com sucesso");
  } catch (e) {
    console.log("Erro ao criar rodar seed de usuários");
    console.error(e);
  } finally {
    await conn.$disconnect();
  }
}
