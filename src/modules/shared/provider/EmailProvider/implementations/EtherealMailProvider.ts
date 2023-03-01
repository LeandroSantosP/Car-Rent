import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import { IEmailProvider } from "../IEmailProvider";
import Handlebars from "handlebars";
import fs from "fs";

@injectable()
export class EtherealMailProvider implements IEmailProvider {
  private client!: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((accountInfos) => {
        const transporter = nodemailer.createTransport({
          host: accountInfos.smtp.host,
          port: accountInfos.smtp.port,
          secure: accountInfos.smtp.secure,
          auth: {
            user: accountInfos.user,
            pass: accountInfos.pass,
          },
        });
        this.client = transporter;
      })
      .catch((err) => console.error(err));
  }
  async sendEmail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");

    const templateParse = Handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <test@test.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
