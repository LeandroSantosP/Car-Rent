import "reflect-metadata";
import { AppError } from "../../../shared/infra/middleware/AppError";
import { SpecificationRepositoryInMemory } from "../infra/repositories/in-memory/specification-repository-in-memory";
import { ISpecificationRepository } from "../infra/repositories/ISpecificationRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationRepository: ISpecificationRepository;

describe("Specification", () => {
  beforeEach(() => {
    specificationRepository = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationRepository
    );
  });
  it("should be able to create a new specification", async () => {
    const Specification = {
      name: "Specification test",
      description: "Description test",
    };
    const newSpecification = await createSpecificationUseCase.execute(
      Specification
    );

    expect(newSpecification).toHaveProperty("id");
  });
  // it("should not to be able create another specification if then already exists!", async () => {
  //   expect(async () => {
  //     const Specification = {
  //       description: "Uma description test",
  //       name: "Category test",
  //     };
  //     const newCategoryTestSecond = {
  //       description: "Uma description test",
  //       name: "Category test",
  //     };

  //     await createSpecificationUseCase.execute(Specification);

  //     await createSpecificationUseCase.execute(newCategoryTestSecond);
  //   }).rejects.toBeInstanceOf(AppError);
  // });
});
