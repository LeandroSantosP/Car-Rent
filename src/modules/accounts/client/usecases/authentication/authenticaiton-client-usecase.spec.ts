import "reflect-metadata";
import { clientInfos } from "@/modules/shared/utils/TestFunction";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { newClient } from "@/modules/shared/utils/TestFunction";
import { ClientRepositoryInMemory } from "../../infra/repositories/in-memory/client-repository-in-memory";
import { AuthenticationClientUseCase } from "./AuthenticationClientUseCase";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { ClientTokenRepositoryInMemory } from "../../infra/repositories/in-memory/client-token-repository-in-memory";
import { IClientTokenRepository } from "../../infra/repositories/IClientTokenRepository";
import { IDateProvider } from "@/modules/shared/provider/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@/modules/shared/provider/DateProvider/implemetations/DayJsDateProvider";

let clientRepositoryInMemory: IClientRepository;
let clientTokenRepositoryInMemory: IClientTokenRepository;
let dateProvider: IDateProvider;
let authenticationClientUseCase: AuthenticationClientUseCase;

describe("Authentication", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    clientTokenRepositoryInMemory = new ClientTokenRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    authenticationClientUseCase = new AuthenticationClientUseCase(
      clientRepositoryInMemory,
      dateProvider,
      clientTokenRepositoryInMemory
    );
  });
  it("should not be able to authentication client", async () => {
    const infos = clientInfos();

    await newClient(infos);

    await expect(
      authenticationClientUseCase.execute({
        email: infos.email,
        password: infos.password,
      })
    ).rejects.toEqual(new AppError("Email or Password Incorrect!!", 401));
  });
});
