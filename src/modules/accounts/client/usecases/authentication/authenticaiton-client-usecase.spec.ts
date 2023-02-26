import "reflect-metadata";
import { clientInfos } from "@/modules/shared/utils/TestFunction";
import { IClientRepository } from "../../infra/repositories/IClientRepository";
import { newClient } from "@/modules/shared/utils/TestFunction";
import { ClientRepositoryInMemory } from "../../infra/repositories/in-memory/client-repository-in-memory";
import { AuthenticationClientUseCase } from "./AuthenticationClientUseCase";
import { AppError } from "@/modules/shared/infra/middleware/AppError";

let clientRepositoryInMemory: IClientRepository;
let authenticationClientUseCase: AuthenticationClientUseCase;

describe("Authentication", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    authenticationClientUseCase = new AuthenticationClientUseCase(
      clientRepositoryInMemory
    );
  });
  it("should not be able to authentication client", async () => {
    expect(async () => {
      const infos = clientInfos();
      await newClient(infos);

      await authenticationClientUseCase.execute({
        email: infos.email,
        password: infos.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
