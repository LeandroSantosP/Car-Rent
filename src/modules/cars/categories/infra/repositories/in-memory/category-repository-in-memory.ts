import { Category } from "../../Entites/CategoryEntity";
import { CategoryDTO } from "../dtos/CategoryDTO";
import {
  ICategoryRepository,
  ICreateCategoryProps,
} from "../ICategoryRepository";

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: CategoryDTO[] = [];

  async GetCategoryById(category_id: string): Promise<CategoryDTO | undefined> {
    const category = this.categories.find((cate) => cate.id === category_id);

    return category;
  }
  async GetCategoryByName(
    category_name: string
  ): Promise<CategoryDTO | undefined> {
    const category = this.categories.find(
      (category) => category.name === category_name
    );

    return category;
  }

  async ListAllCategory(): Promise<CategoryDTO[]> {
    return this.categories;
  }

  async create({
    name,
    description,
  }: ICreateCategoryProps): Promise<CategoryDTO> {
    const NewCategory = new Category({ name, description });
    return NewCategory;
  }
}
