import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/infra/middleware/AppError";
import { ICategoryRepository } from "../infra/repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateNewCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private CategoryRepository: ICategoryRepository
  ) {}
  async execute({ description, name }: IRequest) {
    const AllCategory = await this.CategoryRepository.ListAllCategory();

    for (let i = 0; i < AllCategory.length; i++) {
      if (AllCategory[i].name === name) {
        throw new AppError("Error");
      }
    }

    const newCategory = await this.CategoryRepository.create({
      description,
      name,
    });

    return newCategory;
  }
}
