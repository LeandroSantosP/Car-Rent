import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { createDecipheriv } from "crypto";
import { inject, injectable } from "tsyringe";
import { CarImage } from "../../infra/Entites/CarImage";
import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IRequest {
  license_plate: string;
  imageRef: string | undefined;
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({ license_plate, imageRef }: IRequest) {
    if (!imageRef || !license_plate) {
      throw new AppError("InvalidData");
    }
    const car = await this.carRepository.GetCarByLicensePlate(license_plate);

    if (!car) {
      throw new AppError("Invalid Car Plate!");
    }

    let carsImage: CarImage[] = [];
    if (car) {
      Object.keys(car).forEach((key) => {
        if (key !== "car_image") {
          return;
        }
        if (!car.car_image) {
          return;
        }
        carsImage = car.car_image;
      });
    }

    carsImage.forEach((image) => {
      if (image.image_name === imageRef) {
        throw new AppError("Image Already Exists!");
      }
    });

    const newImage = await this.carRepository.CreateImage({
      imageRef,
      license_plate,
    });

    return newImage;
  }
}
