import "reflect-metadata";
import { describe, test, expect, beforeEach } from "vitest";
import { ZodError } from "zod";
import { ErrorException } from "../../../web/exceptions/ErrorException";
import { CreateUserRequestDto } from "../dtos/create";
import { UserInMemoryRepository } from "../repositories/inMemory/UserInMemoryRepository";
import { CreateUserService } from "./create.service";

describe("CreateUserService", () => {
  let createUserService: CreateUserService;
  let userInMemoryRepository: UserInMemoryRepository;
  beforeEach(() => {
    userInMemoryRepository = new UserInMemoryRepository();
    createUserService = new CreateUserService(userInMemoryRepository);
  });

  test("Deve ser possível criar um novo usuário", async () => {
    const NewUser: CreateUserRequestDto = {
      name: "John Doe",
      registration: "1234567890",
      control: "1234567890",
      profile: "123456",
      role: "adm",
      password: "Test@indt2023",
    };

    const result = await createUserService.execute(NewUser);
    expect(createUserService).toBeDefined();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("updatedAt");
    expect(result.name).toEqual(NewUser.name);
  });

  test("Não deve ser possivel criar um usuário com registro existente", async () => {
    const registration = "123456";
    const NewUser: CreateUserRequestDto = {
      name: "John Doe",
      registration,
      control: "1234567",
      profile: "123456",
      role: "adm",
      password: "Test@indt2023",
    };

    await createUserService.execute(NewUser);
    expect(async () => {
      await createUserService.execute(NewUser);
    }).rejects.toEqual(new ErrorException("Esse registro já está em uso no sistema", 400));
  });

  test("Não deve ser possivel criar um usuário com controle existente", async () => {
    const NewUser: CreateUserRequestDto = {
      name: "John Doe",
      registration: "123456",
      control: "123456",
      profile: "123456",
      role: "adm",
      password: "Test@indt2023",
    };
    const NewUser2: CreateUserRequestDto = {
      name: "John Doe",
      registration: "1234567",
      control: "123456",
      profile: "123456",
      role: "adm",
      password: "Test@indt2023",
    };

    await createUserService.execute(NewUser);
    expect(async () => {
      await createUserService.execute(NewUser2);
    }).rejects.toEqual(new ErrorException("Esse controle já está em uso no sistema", 400));
  });
  test("Não deve ser possivel criar um usuário com itens vázios", async () => {
    expect(async () => {
      await createUserService.execute({
        name: "",
        control: "",
        password: "",
        profile: "",
        role: "adm",
        registration: "",
      });
    }).rejects.toBeInstanceOf(ZodError);
  });
});
