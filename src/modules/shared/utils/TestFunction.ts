import { CreateNewClientUseCase } from "@/modules/accounts/client/usecases/createClient/CreateNewClientUseCase";
import { Client } from "@/modules/accounts/client/infra/Entity/Client";
import { ClientRepositoryInMemory } from "@/modules/accounts/client/infra/repositories/in-memory/client-repository-in-memory";

interface clientInfosProps {
  name?: string;
  email?: string;
  password?: string;
  driver_license?: string;
  avatar?: string;
}

let clientRepositoryInMemory: ClientRepositoryInMemory;
let createClientUseCase: CreateNewClientUseCase;

clientRepositoryInMemory = new ClientRepositoryInMemory();
createClientUseCase = new CreateNewClientUseCase(clientRepositoryInMemory);

export function clientInfos(props?: clientInfosProps) {
  return {
    email: props?.email ?? "JohnDeo@email.com",
    name: props?.name ?? "John Deo",
    password: props?.password ?? "senha123",
    avatar: props?.avatar,
    driver_license: props?.driver_license ?? "498754954903409543",
  };
}

export async function newClient(props: Client) {
  const newClient = await createClientUseCase.execute({
    email: props.email,
    name: props.name,
    password: props.password,
    avatar: props.avatar,
    driver_license: props.driver_license,
  });

  return newClient;
}
