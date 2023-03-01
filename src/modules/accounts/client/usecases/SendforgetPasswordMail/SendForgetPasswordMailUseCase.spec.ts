import "reflect-metadata";

import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@/modules/shared/provider/DateProvider/implemetations/DayJsDateProvider";

import { ClientRepositoryInMemory } from "../../infra/repositories/in-memory/client-repository-in-memory";
import { ClientTokenRepositoryInMemory } from "../../infra/repositories/in-memory/client-token-repository-in-memory";
import { SendForgetPasswordMailUseCase } from "./SendForgetPasswordMailUseCase";
import { EmailProviderInMemory } from "@/modules/shared/provider/EmailProvider/in-memory/EmailProviderInMemory";
import { AppError } from "@/modules/shared/infra/middleware/AppError";

let dateProvider: IDateProvider;
let mailProviderInMemory: EmailProviderInMemory;
let clientTokenRepositoryInMemory: ClientTokenRepositoryInMemory;
let clientRepositoryInMemory: ClientRepositoryInMemory;
let sendForgetPasswordMailUseCase: SendForgetPasswordMailUseCase;

describe("Send Forget Email", () => {
  beforeEach(() => {
    dateProvider = new DayJsDateProvider();
    mailProviderInMemory = new EmailProviderInMemory();
    clientTokenRepositoryInMemory = new ClientTokenRepositoryInMemory();
    clientRepositoryInMemory = new ClientRepositoryInMemory();

    sendForgetPasswordMailUseCase = new SendForgetPasswordMailUseCase(
      clientRepositoryInMemory,
      clientTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });
  it("should to be able to send a forget email to client", async () => {
    // const sendEmail = spyOn(mailProviderInMemory, "sendEmail");
    await clientRepositoryInMemory.create({
      driver_license: "123-abc",
      email: "test@test.com",
      name: "John Doe",
      password: "sennha123",
      avatar: "avatar_test",
    });

    await sendForgetPasswordMailUseCase.execute("test@test.com");
    let result = mailProviderInMemory.message;

    expect(result).toBeInstanceOf(Array);
  });

  it("should not to be able send email if client does not exits!", async () => {
    await expect(
      sendForgetPasswordMailUseCase.execute("maria@email.com")
    ).rejects.toEqual(new AppError("Client does not exists"));
  });

  it("should to create an new ClientToken", async () => {
    // const generateTokenEmail = spyOn(clientTokenRepositoryInMemory, "create");

    await clientRepositoryInMemory.create({
      driver_license: "123-abcd",
      email: "matheus@test.com",
      name: "John Doe",
      password: "sennha123",
      avatar: "avatar_test",
    });

    await sendForgetPasswordMailUseCase.execute("matheus@test.com");
    const result = clientTokenRepositoryInMemory.ClientTokes;

    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toHaveProperty("created_at");
  });
});
