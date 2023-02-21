import { container } from "tsyringe";
import { ICarRepository } from "../../../cars/cars/infra/repositories/ICarRepository";
import { CarRepository } from "../../../cars/cars/infra/repositories/implemetations/CarRepository";
import { ICategoryRepository } from "../../../cars/categories/infra/repositories/ICategoryRepository";
import { CategoryRepository } from "../../../cars/categories/infra/repositories/implemetations/CategoryRepository";
import { SpecificationRepository } from "../../../cars/especification/infra/repositories/implematation/SpecificationRepository";
import { ISpecificationRepository } from "../../../cars/especification/infra/repositories/ISpecificationRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
