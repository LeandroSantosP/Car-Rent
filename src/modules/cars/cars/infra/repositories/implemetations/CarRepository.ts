import { Category } from "@/modules/cars/categories/infra/Entites/CategoryEntity";
import { prisma } from "@/modules/shared/prisma/client";
import { Car } from "../../Entites/Car";

import {
  CrateImageProps,
  ICarRepository,
  ICarRepositoryProps,
  ICreateImageRequest,
  ToggleAvailabilityOfCarProps,
} from "../ICarRepository";

export class CarRepository implements ICarRepository {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async ToggleAvailabilityOfCar({
    availability,
    car_id,
  }: ToggleAvailabilityOfCarProps): Promise<Car> {
    const data = await this.prisma.car.update({
      where: {
        id: car_id,
      },
      data: {
        available: availability,
      },
    });
    return data;
  }
  async CreateManyImage(car_id: string, image: string[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(license_plate: string): Promise<void> {
    await this.prisma.car.delete({
      where: {
        license_plate,
      },
    });
    return;
  }

  async GetCarById(id: string): Promise<Car | null> {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        car_image: true,
        description: true,
        category: true,
        daily_rate: true,
        brand: true,
        license_plate: true,
        created_at: true,
        available: true,
        fine_amount: true,
        Specification_Cars: {
          select: {
            specification: {
              select: {
                id: true,
                name: true,
                description: true,
                created_at: true,
              },
            },
          },
        },
      },
    });

    return car as any;
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

  async GetCarByLicensePlate(license_plate: string): Promise<
    | (Car & {
        category: Category | null;
      })
    | null
    | any
  > {
    const carByLicense = await this.prisma.car.findFirst({
      where: {
        license_plate,
      },
      include: {
        category: true,
      },
    });

    return carByLicense;
  }
  async ListAllCars(
    brand?: string,
    category_id?: string,
    car_name?: string
  ): Promise<Car[]> {
    const where = {
      available: true,
      categoryId: category_id ?? undefined,
      brand: brand ?? undefined,
      name: car_name ?? undefined,
    };
    const allCars = await this.prisma.car.findMany({ where });
    return allCars;
  }
  async LinkCarOnCategory(
    license_plate: string,
    category_id: string
  ): Promise<
    | (Car & {
        category: Category | null;
      })
    | any
  > {
    const carUpdated = await this.prisma.car.update({
      where: {
        license_plate,
      },
      data: {
        category: {
          connect: {
            id: category_id,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return carUpdated;
  }
}
