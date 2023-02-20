import { AppError } from "../../../shared/infra/middleware/AppError";
import { CategoryRepositoryInMemory } from "../infra/repositories/in-memory/category-repository-in-memory";
import { CreateNewCategoryUseCase } from "./CreateNewCategoryUserCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;

let createNewCategoryUseCase: CreateNewCategoryUseCase;

describe("", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createNewCategoryUseCase = new CreateNewCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("should be able to create a new category!!", async () => {
    const newCategoryTest = {
      description: "Uma description test",
      name: "Category test",
    };
    await createNewCategoryUseCase.execute(newCategoryTest);

    const categoryCreated = await categoryRepositoryInMemory.GetCategoryByName(
      newCategoryTest.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not to be able to create a new category if name already exists!", () => {
    expect(async () => {
      const newCategoryTestOne = {
        description: "Uma description test",
        name: "Category test",
      };
      const newCategoryTestSecond = {
        description: "Uma description test",
        name: "Category test",
      };

      await createNewCategoryUseCase.execute(newCategoryTestOne);
      await createNewCategoryUseCase.execute(newCategoryTestSecond);
    }).rejects.toBeInstanceOf(AppError);
  });
});
