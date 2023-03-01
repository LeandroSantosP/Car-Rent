import { Category } from "@/modules/cars/categories/infra/Entites/CategoryEntity";
import { ICategoryRepository } from "@/modules/cars/categories/infra/repositories/ICategoryRepository";
import { AppError } from "@/modules/shared/infra/middleware/AppError";
import { inject } from "tsyringe";

interface IRequest {
  category_name: string;
  license_plate: string;
}

export class CarCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private CategoryRepository: ICategoryRepository
  ) {}

  async execute({ category_name, license_plate }: IRequest): Promise<Category> {
    const categoryExists = await this.CategoryRepository.GetCategoryByName(
      category_name
    );

    if (!categoryExists) {
      throw new AppError("Category does not exits!");
    }

    const categoryOnCAr = await this.CategoryRepository.PutCategoryOnCar(
      category_name,
      license_plate
    );

    return categoryOnCAr;
  }
}
