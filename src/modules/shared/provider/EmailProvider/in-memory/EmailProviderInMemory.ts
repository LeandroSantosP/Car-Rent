import { IEmailProvider } from "../IEmailProvider";

export class EmailProviderInMemory implements IEmailProvider {
  message: any[] = [];
  async sendEmail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void> {
    this.message.push(to, subject, variables, templatePath);
  }
}
