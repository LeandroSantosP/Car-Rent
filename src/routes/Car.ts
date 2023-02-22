import { CreateCarImageController } from "@/modules/cars/carImage/CreateCarImageControll";
import { CreateNewCarController } from "@/modules/cars/cars/CreateNewCar/CreateNewCarController";
import { Router } from "express";

const carRouter = Router();

const createNewCarController = new CreateNewCarController();
const createCarImageController = new CreateCarImageController();

carRouter.post("/", createNewCarController.handle);
carRouter.post("/images", createCarImageController.handle);

export { carRouter };
