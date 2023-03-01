import { Car } from "@/modules/cars/cars/infra/Entites/Car";
import "reflect-metadata";
import { Category } from "../../Entites/CategoryEntity";
import { CategoryDTO } from "../dtos/CategoryDTO";
import {
  ICategoryRepository,
  ICreateCategoryProps,
} from "../ICategoryRepository";

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async GetCategoryById(category_id: string): Promise<CategoryDTO | null> {
    const category = this.categories.find((cate) => cate.id === category_id);

    if (!category) {
      return null;
    }

    return category;
  }
  async GetCategoryByName(category_name: string): Promise<CategoryDTO | null> {
    const category = await this.categories.find(
      (category) => category.name === category_name
    );
    if (!category) {
      return null;
    }
    return category;
  }

  async ListAllCategory(): Promise<CategoryDTO[]> {
    return this.categories;
  }

  async create({
    name,
    description,
  }: ICreateCategoryProps): Promise<CategoryDTO> {
    const NewCategory = new Category();

    Object.assign(NewCategory, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(NewCategory);

    return NewCategory;
  }

  async PutCategoryOnCar(
    category_name: string,
    license_plate: string
  ): Promise<Category> {
    const categoryForUpdate = this.categories.find(
      (ct) => ct.name === category_name
    ) as Category;

    const car = new Car();
    car.license_plate = license_plate;

    categoryForUpdate.Car?.push(car);

    // Updated category on Array

    const categoryIndex = this.categories.indexOf(categoryForUpdate);
    this.categories[categoryIndex] = categoryForUpdate;

    return categoryForUpdate;
  }
}
