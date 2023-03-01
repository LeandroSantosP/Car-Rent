import { Category } from "../Entites/CategoryEntity";

export interface ICreateCategoryProps {
  name: string;
  description: string;
}

export abstract class ICategoryRepository {
  abstract create({
    name,
    description,
  }: ICreateCategoryProps): Promise<Category>;

  abstract GetCategoryById(category_id: string): Promise<Category | null>;
  abstract GetCategoryByName(category_name: string): Promise<Category | null>;

  abstract ListAllCategory(): Promise<Category[]>;

  abstract PutCategoryOnCar(
    category_name: string,
    license_plate: string
  ): Promise<Category>;
}
