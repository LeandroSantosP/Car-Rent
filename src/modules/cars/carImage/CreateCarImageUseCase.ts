import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { createDecipheriv } from "crypto";
import { inject, injectable } from "tsyringe";
import { CarImage } from "../cars/infra/Entites/CarImage";
import { ICarRepository } from "../cars/infra/repositories/ICarRepository";

interface IRequest {
  license_plate: string;
  imageRef: string;
}

@injectable()
export class CreateCarImageUseCase {
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

    const carsImage: CarImage[][] = [];
    if (car) {
      Object.keys(car).forEach((key) => {
        if (key !== "car_image") {
          return;
        }
        if (!car.car_image) {
          return;
        }

        carsImage.push(car.car_image);
      });
    }

    carsImage[0].forEach((image) => {
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
