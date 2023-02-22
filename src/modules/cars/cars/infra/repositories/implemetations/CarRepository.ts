import { prisma } from "@/modules/shared/prisma/client";
import { Car } from "../../Entites/Car";
import { CarDTO } from "../dtos/CarDTO";

import { ICarRepository, ICarRepositoryProps } from "../ICarRepository";

export class CarRepository implements ICarRepository {
  private prisma;

  constructor() {
    this.prisma = prisma;
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

  async GetCarByLicensePlate(license_plate: string): Promise<CarDTO | null> {
    const carByLicense = await this.prisma.car.findUnique({
      where: {
        license_plate,
      },
    });
    return carByLicense;
  }
  async ListAllCars(): Promise<CarDTO[]> {
    const allCars = await this.prisma.car.findMany();
    return allCars;
  }
}
