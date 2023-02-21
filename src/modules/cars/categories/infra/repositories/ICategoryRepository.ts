import { CategoryDTO } from "./dtos/CategoryDTO";

export interface ICreateCategoryProps {
  name: string;
  description: string;
}

export abstract class ICategoryRepository {
  abstract create({
    name,
    description,
  }: ICreateCategoryProps): Promise<CategoryDTO>;

  abstract GetCategoryById(category_id: string): Promise<CategoryDTO | null>;
  abstract GetCategoryByName(
    category_name: string
  ): Promise<CategoryDTO | null>;

  abstract ListAllCategory(): Promise<CategoryDTO[]>;
}
