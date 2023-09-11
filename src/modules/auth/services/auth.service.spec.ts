import "reflect-metadata";
import { describe, test, beforeEach, expect } from "vitest";
import { CreateUserRequestDto } from "../../user/dtos/create";
import { UserInMemoryRepository } from "../../user/repositories/inMemory/UserInMemoryRepository";
import { CreateUserService } from "../../user/services/create.service";
import { AuthService } from "./auth.service";

let authService: AuthService;
let userService: CreateUserService;
let repository: UserInMemoryRepository;
describe("AuthService", () => {
  beforeEach(() => {
    repository = new UserInMemoryRepository();
    userService = new CreateUserService(repository);
    authService = new AuthService(repository);
  });

  test("Deve ser possível autenticar com usuário existente", async () => {
    const user: CreateUserRequestDto = {
      name: "John Doe",
      registration: "123456",
      control: "123456",
      password: "Admin@2023",
      profile: "admin",
      role: "adm",
    };

    await userService.execute(user);

    const response = await authService.execute({
      password: "Admin@2023",
      control: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("user");
  });
});
