import { prisma } from "@/modules/shared/prisma/client";
import { Car } from "../../Entites/Car";

import { CarDTO } from "../dtos/CarDTO";

import {
  CrateImageProps,
  ICarRepository,
  ICarRepositoryProps,
  ICreateImageRequest,
} from "../ICarRepository";

export class CarRepository implements ICarRepository {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }
  async CreateImage({
    license_plate,
    imageRef,
  }: ICreateImageRequest): Promise<CrateImageProps> {
    const newImage = await this.prisma.car_Image.create({
      data: {
        image_name: imageRef,
        car: {
          connect: {
            license_plate,
          },
        },
      },
      select: {
        car: {
          select: {
            name: true,
            available: true,
            license_plate: true,
            car_image: true,
          },
        },
      },
    });
    return newImage;
  }
  async create({
    daily_rate,
    brand,
    description,
    fine_amount,
    license_plate,
    name,
    category_id,
  }: ICarRepositoryProps): Promise<void> {
    await this.prisma.car.create({
      data: {
        name,
        description,
        daily_rate,
        brand,
        fine_amount,
        license_plate,
        categoryId: category_id,
      },
    });

    return;
  }

  async GetCarByLicensePlate(license_plate: string): Promise<Car | null> {
    const carByLicense = await this.prisma.car.findFirst({
      where: {
        license_plate,
      },
      include: {
        car_image: true,
      },
    });

    return carByLicense;
  }
  async ListAllCars(): Promise<CarDTO[]> {
    const allCars = await this.prisma.car.findMany();
    return allCars;
  }
}
