import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { User } from "../../../models/user";
import { EncryptPassword } from "../../../utils/encrypt";
import { ErrorException } from "../../../web/exceptions/ErrorException";
import { CreateUserRequestDto, CreateUserSchema } from "../dtos/create";

@injectable()
export class CreateUserService {
  private readonly userRepository: IUserRepository;

  constructor(@inject("UserRepository") userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: CreateUserRequestDto): Promise<User> {
    await CreateUserSchema.parseAsync(data);
    const registrationExist = await this.userRepository.findByRegistration(data.registration);

    if (registrationExist) {
      throw new ErrorException("Esse registro já está em uso no sistema", 400);
    }

    const controlExist = await this.userRepository.findByControl(data.control);
    if (controlExist) {
      throw new ErrorException("Esse controle já está em uso no sistema", 400);
    }

    return this.userRepository.create({
      ...data,
      password: await EncryptPassword(data.password),
    });
  }
}
