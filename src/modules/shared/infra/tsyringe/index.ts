import { container } from "tsyringe";

import "@/modules/shared/provider/";

import { IClientRepository } from "@/modules/accounts/client/infra/repositories/IClientRepository";
import { ClientRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientRepostory";
import { RentalRepository } from "@/modules/rentals/infra/repositories/RentalRepository";
import { IRentalsRepository } from "@/modules/rentals/repositories/IRantalsRepository";
import { ICarRepository } from "../../../cars/cars/infra/repositories/ICarRepository";
import { CarRepository } from "../../../cars/cars/infra/repositories/implemetations/CarRepository";
import { ICategoryRepository } from "../../../cars/categories/infra/repositories/ICategoryRepository";
import { CategoryRepository } from "../../../cars/categories/infra/repositories/implemetations/CategoryRepository";
import { SpecificationRepository } from "../../../cars/especification/infra/repositories/implematation/SpecificationRepository";
import { ISpecificationRepository } from "../../../cars/especification/infra/repositories/ISpecificationRepository";

container.registerSingleton<IRentalsRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientRepository
);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
