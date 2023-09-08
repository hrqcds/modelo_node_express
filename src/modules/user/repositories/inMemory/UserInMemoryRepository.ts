import crypto from "crypto";
import { IUserRepository } from "../../../../interfaces/repositories/IUserRepository";
import { User } from "../../../../models/user";
import { CreateUserRequestDto } from "../../dtos/create";
import { QueryUserDto } from "../../dtos/query";

export class UserInMemoryRepository implements IUserRepository {
  private users: User[] = [];
  async create(data: CreateUserRequestDto): Promise<User> {
    const user: User = {
      ...data,
      id: crypto.randomUUID(),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);
    return user;
  }
  async findByControl(control: string): Promise<User | undefined | null> {
    return this.users.find((u) => u.control === control);
  }
  async findByRegistration(registration: string): Promise<User | undefined | null> {
    return this.users.find((u) => u.registration === registration);
  }
  async findAll(query: QueryUserDto): Promise<{
    data: User[];
    total: number;
  }> {
    return {
      data: this.users
        .filter(
          (u) =>
            u.active === Boolean(query.active) &&
            u.profile.includes(query.profile!) &&
            u.role.includes(query.role!),
        )
        .slice(query.skip, query.take),
      total: this.users.length,
    };
  }
}
