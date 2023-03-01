import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { IClientTokenRepository } from "../../infra/repositories/IClientTokenRepository";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { IEmailProvider } from "@/modules/shared/provider/EmailProvider/IEmailProvider";

@injectable()
export class SendForgetPasswordMailUseCase {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: IClientRepository,
    @inject("ClientTokenRepository")
    private ClientTokenRepository: IClientTokenRepository,
    @inject("DayJsDateProvider")
    private DateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private EmailProvider: IEmailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const client = await this.ClientRepository.FindByEmail(email);
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "ForgetPasswordTemplate.hbs"
    );

    if (!client) {
      throw new AppError("Client does not exists");
    }

    const token = uuidV4();

    const expire_date = this.DateProvider.addHours(3);

    await this.ClientTokenRepository.create({
      refresh_token: token,
      client_id: client.id!,
      expire_date,
    });

    const variable = {
      name: client.name,
      link: `${process.env.FORGET_EMAIL_URL}${token}`,
    };

    await this.EmailProvider.sendEmail(
      email,
      "Recuperacao de senha",
      variable,
      templatePath
    );

    return;
  }
}
