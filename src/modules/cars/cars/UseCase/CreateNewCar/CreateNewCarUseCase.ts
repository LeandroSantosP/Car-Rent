import { inject, injectable } from "tsyringe";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { ICategoryRepository } from "@/modules/cars/categories/infra/repositories/ICategoryRepository";
import { Car } from "../../infra/Entites/Car";
import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id?: string;
}

@injectable()
export class CreateNewCarUseCase {
  constructor(
    @inject("CarRepository")
    private CarRepository: ICarRepository,

    @inject("CategoryRepository")
    private CategoryRepository: ICategoryRepository
  ) {}
  async execute({
    brand,
    daily_rate,
    description,
    category_id,
    license_plate,
    name,
    fine_amount,
  }: IRequest) {
    if (category_id) {
      const categoryExits = await this.CategoryRepository.GetCategoryById(
        category_id
      );

      if (!categoryExits) {
        throw new AppError("Invalid Category ID!");
      }
    }

    if (category_id?.length == 0) {
      throw new AppError("Invalid Category ID!");
    }

    const CarAlreadyExists = await this.CarRepository.GetCarByLicensePlate(
      license_plate
    );

    if (CarAlreadyExists) {
      throw new AppError("Plate Already Cadaster!");
    }

    const newCar = new Car();

    Object.assign(newCar, {
      daily_rate,
      brand,
      description,
      fine_amount,
      license_plate,
      name,
      category_id,
    });

    await this.CarRepository.create({
      brand: newCar.brand,
      daily_rate: newCar.daily_rate,
      description: newCar.description,
      license_plate: newCar.license_plate,
      name: newCar.name,
      fine_amount: newCar.fine_amount,
      category_id: newCar.category_id,
    });

    return;
  }
}
