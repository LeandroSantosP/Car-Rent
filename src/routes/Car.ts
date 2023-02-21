import { CreateNewCarController } from "@/modules/cars/cars/CreateNewCar/CreateNewCarController";
import { Router } from "express";

const carRouter = Router();

const createNewCarController = new CreateNewCarController();

carRouter.post("/", createNewCarController.handle);

export { carRouter };
