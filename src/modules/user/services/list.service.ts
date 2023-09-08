import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { ListUserResponse } from "../dtos/list";
import { QueryUserSchema, QueryUserDto } from "../dtos/query";

@injectable()
export class ListUserService {
  private readonly userRepository: IUserRepository;

  constructor(@inject("UserRepository") userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(query: QueryUserDto): Promise<ListUserResponse> {
    await QueryUserSchema.parseAsync(query);
    return this.userRepository.findAll({
      ...query,
      skip: Number(query.skip) * Number(query.take),
      take: Number(query.take),
      active: query.active ?? "true",
    });
  }
}
