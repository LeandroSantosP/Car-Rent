import { ICategoryRepository } from "@/modules/cars/categories/infra/repositories/ICategoryRepository";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/Entites/Car";
import { ICarRepository } from "../../infra/repositories/ICarRepository";

interface IRequest {
  license_plate: string;
  category_id: string;
}

@injectable()
export class CategoryOnCarUseCase {
  constructor(
    @inject("CarRepository")
        private carRepository: ICarRepository,
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
  ) {}

  async execute({ license_plate, category_id }: IRequest): Promise<Car> {
    const carExits = await this.carRepository.GetCarByLicensePlate(
      license_plate
    );

    const categoryExits = await this.categoryRepository.GetCategoryById(
      category_id
    );

    if (!categoryExits) {
          throw new AppError("Category does not exits!");
    }

    if (!carExits) {
      throw new AppError("Car does not Exits!");
    }

    let { category } = carExits;

    Object.keys(category!).forEach((key) => {
      if (category && key === "id" && category[key]?.includes(category_id)) {
        throw new AppError(
          "Category '" + category_id + "' already exists for this car!"
        );
      }
    });

    const car = await this.carRepository.LinkCarOnCategory(
      license_plate,
      category_id
    );

    return car;
  }
}
