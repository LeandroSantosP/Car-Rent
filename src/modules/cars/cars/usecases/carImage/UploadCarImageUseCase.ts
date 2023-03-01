import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { IStorageProvider } from "@/modules/shared/provider/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IRequest {
  license_plate: string;
  imageRef: string | undefined;
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("StorageProvider")
    private StorageProvider: IStorageProvider
  ) {}

  async execute({ license_plate, imageRef: fileRef }: IRequest) {
    if (!fileRef || !license_plate) {
      throw new AppError("InvalidData");
    }
    const car = await this.carRepository.GetCarByLicensePlate(license_plate);

    if (!car) {
      throw new AppError("Invalid Car Plate!");
    }

    this.StorageProvider.save(fileRef, "CarImage");

    const newImage = await this.carRepository.CreateImage({
      imageRef: fileRef,
      license_plate,
    });
    return newImage;
  }
}
