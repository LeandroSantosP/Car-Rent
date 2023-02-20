import { CategoryDTO } from "../dtos/CategoryDTO";
import {
  ICategoryRepository,
  ICreateCategoryProps,
} from "../ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  GetCategoryById(category_id: string): Promise<CategoryDTO | undefined> {
    throw new Error("Method not implemented.");
  }
  GetCategoryByName(category_name: string): Promise<CategoryDTO | undefined> {
    throw new Error("Method not implemented.");
  }
  ListAllCategory(): Promise<CategoryDTO[]> {
    throw new Error("Method not implemented.");
  }
  create({ name, description }: ICreateCategoryProps): Promise<CategoryDTO> {
    throw new Error("Method not implemented.");
  }
}
