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

  abstract GetCategoryById(
    category_id: string
  ): Promise<CategoryDTO | undefined>;
  abstract GetCategoryByName(
    category_name: string
  ): Promise<CategoryDTO | undefined>;

  abstract ListAllCategory(): Promise<CategoryDTO[]>;
}
