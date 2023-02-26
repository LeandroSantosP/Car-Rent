import { CreateRentalController } from "@/modules/rentals/usecases/createRantls/CreateRentalController";
import { DevolutionRentalController } from "@/modules/rentals/usecases/devolutionRental/DevolutionRentalController";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import { Router } from "express";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

const rentalRoutes = Router();

rentalRoutes.use(EnsureAuthentication);
rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.post("/devolution/:id", devolutionRentalController.handle);

export { rentalRoutes };
