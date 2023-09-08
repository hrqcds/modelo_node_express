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
    const registrationExist = await this.userRepository.findByRegistration(data.registration);

    if (!registrationExist) {
      throw new ErrorException("Usuário não encontrado no sistema", 404);
    }
    const passwordMatch = await DecryptPassword(data.password, registrationExist.password);
    if (!passwordMatch) {
      throw new ErrorException("Usuário ou senha incorretos", 401);
    }

    return {
      token: GenerateToken(registrationExist.registration, registrationExist.role),
      user: {
        name: registrationExist.name,
        role: registrationExist.role,
      },
    };
  }
}
