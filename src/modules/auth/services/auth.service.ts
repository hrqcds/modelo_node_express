import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../interfaces/repositories/IUserRepository";
import { DecryptPassword } from "../../../utils/encrypt";
import { GenerateToken } from "../../../utils/token";
import { ErrorException } from "../../../web/exceptions/ErrorException";
import { AuthRequestUserDto, AuthResponseUserDto, AuthUserSchema } from "../dtos/auth";

@injectable()
export class AuthService {
  private readonly userRepository: IUserRepository;

  constructor(@inject("UserRepository") userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async execute(data: AuthRequestUserDto): Promise<AuthResponseUserDto> {
    await AuthUserSchema.parseAsync(data);
    const controlExist = await this.userRepository.findByControl(data.control);

    if (!controlExist) {
      throw new ErrorException("Usuário não encontrado no sistema", 404);
    }
    const passwordMatch = await DecryptPassword(data.password, controlExist.password);
    if (!passwordMatch) {
      throw new ErrorException("Usuário ou senha incorretos", 401);
    }

    return {
      token: GenerateToken(controlExist.registration, controlExist.role),
      user: {
        name: controlExist.name,
        role: controlExist.role,
      },
    };
  }
}
