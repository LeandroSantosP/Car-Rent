import { CreateCarImageController } from "@/modules/cars/carImage/CreateCarImageControll";
import { CreateNewCarController } from "@/modules/cars/cars/UseCase/CreateNewCar/CreateNewCarController";
import { Router } from "express";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import uploadConfig from "@/modules/shared/utils/uploadConfig";
import multer from "multer";
import { ensureAdministrations } from "@/modules/shared/infra/middleware/ensureAdministrations";
import { DeleteCarController } from "@/modules/cars/cars/UseCase/deleteCar/DeleteCarController";
import { ListAvailableCarsController } from "@/modules/cars/cars/UseCase/ListCars/ListAvailableCarsController";
const carRouter = Router();

const createNewCarController = new CreateNewCarController();
const createCarImageController = new CreateCarImageController();
const listAvailableCarsController = new ListAvailableCarsController();
const deleteCarController = new DeleteCarController();
const uploadAvatar = multer(uploadConfig.upload("./tmp/CarImage"));

carRouter.use(EnsureAuthentication);
/* Public */
carRouter.get("/list", listAvailableCarsController.handle);
/* Public - end*/
/* Just Client - Start */

/* Just Client - End */
carRouter.use(ensureAdministrations);
/* Just Admins - Start */
carRouter.delete("/delete/:license_plate", deleteCarController.handle);
carRouter.post("/", createNewCarController.handle);
carRouter.post(
  "/images/:license_plate",
  uploadAvatar.single("carImage"),
  createCarImageController.handle
);
/* Just Admins - End */

export { carRouter };
