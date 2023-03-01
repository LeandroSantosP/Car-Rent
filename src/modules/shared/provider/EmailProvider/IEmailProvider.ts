export abstract class IEmailProvider {
  abstract sendEmail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void>;
}
