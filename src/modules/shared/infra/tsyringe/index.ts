import { container } from "tsyringe";
import { ICategoryRepository } from "../../../cars/categories/infra/repositories/ICategoryRepository";
import { CategoryRepository } from "../../../cars/categories/infra/repositories/implemetations/CategoryRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);
