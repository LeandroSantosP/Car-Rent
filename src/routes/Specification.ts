import { CreateCarsSpecificationController } from "@/modules/cars/especification/UseCases/CreateCarsSpecification/CreateCarsSpecificationControlle";
import { ensureAdministrations } from "@/modules/shared/infra/middleware/ensureAdministrations";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import { Router } from "express";
import { CreateSpecificationController } from "@/modules/cars/especification/UseCases/CreateSpesification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const createCarsSpecificationController =
  new CreateCarsSpecificationController();

specificationRoutes.use(EnsureAuthentication);
specificationRoutes.use(ensureAdministrations);
specificationRoutes.post("/", createSpecificationController.handle);
specificationRoutes.post("/:id", createCarsSpecificationController.handle);

export { specificationRoutes };
