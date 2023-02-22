import "reflect-metadata";
import { Category } from "../../Entites/CategoryEntity";
import { CategoryDTO } from "../dtos/CategoryDTO";
import {
  ICategoryRepository,
  ICreateCategoryProps,
} from "../ICategoryRepository";

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: CategoryDTO[] = [];

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
}

// import { RentalsUseCase } from "./RentalsUseCase";

// describe("Preview", () => {
//   it("should simulate the rent", async () => {
//     const preview = new RentalsUseCase();

//     const rent = await preview.execute({
//       licensePlate: "ABC-1234",
//       days: 7,
//       personAge: 18,
//     });

//     expect(rent).toBe(275);
//   });

//   it("should simulate the rent", async () => {
//     const preview = new RentalsUseCase();

//     const rent = await preview.execute({
//       licensePlate: "ABC-1111",
//       days: 7,
//       personAge: 18,
//     });

//     expect(rent).toBe(235.5);
//   });
// });
