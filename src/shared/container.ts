import { container } from "tsyringe";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { UserPrismaRepository } from "../modules/user/repositories/Prisma/UserPrismaRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserPrismaRepository);
