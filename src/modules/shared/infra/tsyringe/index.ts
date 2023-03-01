import { container } from "tsyringe";

import "../../provider";

import { IClientRepository } from "@/modules/accounts/client/infra/repositories/IClientRepository";
import { ClientRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientRepostory";
import { IClientTokenRepository } from "@/modules/accounts/client/infra/repositories/IClientTokenRepository";
import { RentalRepository } from "@/modules/rentals/infra/repositories/RentalRepository";
import { IRentalsRepository } from "@/modules/rentals/repositories/IRantalsRepository";
import { ICarRepository } from "@/modules/cars/cars/infra/repositories/ICarRepository";
import { CarRepository } from "@/modules/cars/cars/infra/repositories/implemetations/CarRepository";
import { ICategoryRepository } from "@/modules/cars/categories/infra/repositories/ICategoryRepository";
import { CategoryRepository } from "@/modules/cars/categories/infra/repositories/implemetations/CategoryRepository";
import { SpecificationRepository } from "@/modules/cars/especification/infra/repositories/implematation/SpecificationRepository";
import { ISpecificationRepository } from "@/modules/cars/especification/infra/repositories/ISpecificationRepository";
import { ClientTokenRepository } from "@/modules/accounts/client/infra/repositories/implemetations/ClientTokenRepository";

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

container.registerSingleton<IClientTokenRepository>(
  "ClientTokenRepository",
  ClientTokenRepository
);
container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
