import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { deleteFile } from "@/modules/shared/utils/file";
import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../infra/repositories/IClientRepository";

interface IRequest {
  client_id: string;
  avatarRef: string;
}

@injectable()
export class AvatarImportUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute({ avatarRef, client_id }: IRequest) {
    console.log(client_id);

    const client = await this.clientRepository.FindById(client_id);

    if (client?.avatar) {
      await deleteFile(`./tmp/avatar/${client.avatar}`);
    }

    if (!client) {
      throw new AppError("Not Authorization");
    }

    return await this.clientRepository.UploadAvatar({
      avatarRef,
      client_id: client.id,
    });
  }
}
