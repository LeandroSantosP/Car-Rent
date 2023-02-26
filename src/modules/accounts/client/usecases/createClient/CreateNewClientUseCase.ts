import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { Client } from "../../infra/Entity/Client";
import { IClientRepository } from "../../infra/repositories/IClientRepository";

export type IRequest = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string | null;
};

interface IResponse {
  message: string;
  client: {
    name: string;
    email: string;
    admin?: boolean | null;
    avatar?: string | null;
  };
}

@injectable()
export class CreateNewClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute(props: IRequest): Promise<IResponse | undefined> {
    const clientAllReadyExits = await this.clientRepository.FindByEmail(
      props.email
    );

    const driverLicenseAlreadyCadaster =
      await this.clientRepository.GetClientByLicenseDriver(
        props.driver_license
      );

    if (clientAllReadyExits) {
      throw new AppError("Client Already Exits!");
    }

    if (driverLicenseAlreadyCadaster) {
      throw new AppError("Driver License AlReadyExists!");
    }

    const hashPassWord = await hash(props.password, 9);

    const client = new Client();
    Object.assign(client, {
      avatar: props.avatar,
      email: props.email,
      name: props.name,
      password: hashPassWord,
      driver_license: props.driver_license,
    });

    const newClient = await this.clientRepository.create(client);

    const { password, created_at, driver_license, id, ...clientInfos } =
      newClient;

    return {
      message: "Created Client With Success",
      client: clientInfos,
    };
  }
}
