import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
export async function UserSeed(conn: PrismaClient) {
  try {
    const password = await bcrypt.hash("Admin@2023", 10);
    await conn.$connect();
    const adminiExist = await conn.user.findFirst({
      where: {
        control: "administrador",
      },
    });
    if (!adminiExist) {
      await conn.user.create({
        data: {
          name: "administrador",
          registration: "administrador",
          control: "administrador",
          profile: "administrador",
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
