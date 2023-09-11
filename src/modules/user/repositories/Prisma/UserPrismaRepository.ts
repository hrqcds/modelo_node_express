import { PrismaClient } from "@prisma/client";
import { conn } from "../../../../database/db";
import { IUserRepository } from "../../../../interfaces/repositories/IUserRepository";
import { User } from "../../../../models/user";
import { CreateUserRequestDto } from "../../dtos/create";
import { QueryUserDto } from "../../dtos/query";

export class UserPrismaRepository implements IUserRepository {
  private readonly conn: PrismaClient;

  constructor() {
    this.conn = conn;
  }
  async findByControl(control: string): Promise<User | undefined | null> {
    return this.conn.user.findUnique({
      where: { control },
    });
  }
  async findByRegistration(registration: string): Promise<User | undefined | null> {
    return this.conn.user.findUnique({
      where: { registration },
    });
  }
  async findById(id: string): Promise<User | undefined | null> {
    return this.conn.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserRequestDto): Promise<User> {
    const user = await this.conn.user.create({
      data: {
        ...data,
      },
    });

    return user;
  }
  async findAll(query: QueryUserDto): Promise<{
    data: User[];
    total: number;
  }> {
    const users = await this.conn.user.findMany({
      skip: query.skip,
      take: query.take,
      where: {
        profile: {
          contains: query.profile,
        },
        role: {
          contains: query.role,
        },
        active: Boolean(query.active),
      },
    });
    const total = await this.conn.user.count();
    return {
      data: users,
      total,
    };
  }
}
