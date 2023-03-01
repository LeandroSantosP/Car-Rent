import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { IClientTokenRepository } from "../../infra/repositories/IClientTokenRepository";
import { hash } from "bcrypt";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("ClientTokenRepository")
    private ClientTokenRepository: IClientTokenRepository,
    @inject("DayJsDateProvider")
    private DateProvider: IDateProvider,
    @inject("ClientRepository")
    private ClientRepository: IClientRepository
  ) {}
  async execute({ password, token }: IRequest): Promise<void> {
    const clientToken = await this.ClientTokenRepository.findByRefreshToken(
      token
    );

    if (!clientToken) {
      throw new AppError("Token Invalid!");
    }

    const tokenIsExpires = this.DateProvider.compareIsBefore(
      clientToken.expire_date,
      this.DateProvider.dateNow()
    );

    if (tokenIsExpires) {
      throw new AppError("Token already Expired!");
    }

    const client = await this.ClientRepository.FindById(clientToken.clientId);

    const hashPassword = await hash(password, 9);

    const updatedClientPassword = await this.ClientRepository.updatedPassword({
      client_id: client?.id!,
      newPassword: hashPassword,
    });

    await this.ClientTokenRepository.deleteById(clientToken.id!);

    return;
  }
}
