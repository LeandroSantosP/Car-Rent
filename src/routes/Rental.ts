import { CreateRentalController } from "@/modules/rentals/usecases/createRantls/CreateRentalController";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import { Router } from "express";

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.use(EnsureAuthentication);
rentalRoutes.post("/", createRentalController.handle);

export { rentalRoutes };
