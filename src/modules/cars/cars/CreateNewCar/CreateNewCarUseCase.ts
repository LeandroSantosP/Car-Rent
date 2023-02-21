import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/infra/middleware/AppError";
import { ICategoryRepository } from "../../categories/infra/repositories/ICategoryRepository";
import { ICarRepository } from "../infra/repositories/ICarRepository";

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
      console.log("pl");
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

    await this.CarRepository.create({
      brand,
      daily_rate,
      description,
      license_plate,
      name,
      fine_amount,
      category_id,
    });

    return;
  }
}
