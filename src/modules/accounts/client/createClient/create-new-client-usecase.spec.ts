import "reflect-metadata";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { Client } from "../infra/Entity/Client";
import { ClientRepositoryInMemory } from "../infra/repositories/in-memory/client-repository-in-memory";
import { CreateNewClientUseCase } from "./CreateNewClientUseCase";

let clientRepositoryInMemory: ClientRepositoryInMemory;
let createClientUseCase: CreateNewClientUseCase;

interface clientInfosProps {
  name?: string;
  email?: string;
  password?: string;
  driver_license?: string;
  avatar?: string;
}

describe("CrateNewClient", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    createClientUseCase = new CreateNewClientUseCase(clientRepositoryInMemory);
  });

  function clientInfos(props?: clientInfosProps) {
    return {
      email: props?.email ?? "JohnDeo@email.com",
      name: props?.name ?? "John Deo",
      password: props?.password ?? "senha123",
      avatar: props?.avatar,
      driver_license: props?.driver_license ?? "498754954903409543",
    };
  }

  async function newClient(props: Client) {
    const newClient = await createClientUseCase.execute({
      email: props.email,
      name: props.name,
      password: props.password,
      avatar: props.avatar,
      driver_license: props.driver_license,
    });

    return newClient;
  }
  it("should be able to create a new client.", async () => {
    const clientInfosONE = clientInfos();

    const result = await newClient(clientInfosONE);

    expect(result?.client).toHaveProperty("email");
  });

  it("should not to be able create a new client if email already exists.", () => {
    expect(async () => {
      const clientInfosONE = clientInfos();
      const clientInfosTWO = clientInfos({
        driver_license: "498754954903409541",
      });

      await newClient(clientInfosONE);
      await newClient(clientInfosTWO);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not to be able create a new client if driver license already exists.", () => {
    expect(async () => {
      const clientInfosONE = clientInfos();
      const clientInfosTWO = clientInfos({
        email: "JohnDeo2@email.com",
        driver_license: "DSAdasds2",
      });

      await createClientUseCase.execute(clientInfosONE);
      await createClientUseCase.execute(clientInfosTWO);
    }).rejects.toBeInstanceOf(AppError);
  });
});
