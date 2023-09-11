import { User } from "../../models/user";
import { CreateUserRequestDto } from "../../modules/user/dtos/create";
import { QueryUserDto } from "../../modules/user/dtos/query";

export interface IUserRepository {
  create(data: CreateUserRequestDto): Promise<User>;
  findByControl(control: string): Promise<User | undefined | null>;
  findByRegistration(registration: string): Promise<User | undefined | null>;
  findById(id: string): Promise<User | undefined | null>;
  findAll(query: QueryUserDto): Promise<{ data: User[]; total: number }>;
}
