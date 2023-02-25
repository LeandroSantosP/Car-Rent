import { ListAvailableCarsController } from "@/modules/cars/cars/UseCase/ListCars/ListAvailableCarsController";
import { UploadCarImageController } from "@/modules/cars/cars/UseCase/carImage/UploadCarImageController";
import { CreateNewCarController } from "@/modules/cars/cars/UseCase/CreateNewCar/CreateNewCarController";
import { DeleteCarController } from "@/modules/cars/cars/UseCase/deleteCar/DeleteCarController";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import { ensureAdministrations } from "@/modules/shared/infra/middleware/ensureAdministrations";
import uploadConfig from "@/modules/shared/utils/uploadConfig";
import { Router } from "express";
import multer from "multer";
const carRoutes = Router();

const createNewCarController = new CreateNewCarController();
const createCarImageController = new UploadCarImageController();
const listAvailableCarsController = new ListAvailableCarsController();
const deleteCarController = new DeleteCarController();
const uploadSingleImage = multer(uploadConfig.upload("./tmp/CarImage"));

carRoutes.use(EnsureAuthentication);
/* Public */
carRoutes.get("/list", listAvailableCarsController.handle);
/* Public - end*/
/* Just Client - Start */

/* Just Client - End */
/* Just Admins - Start */
carRoutes.use(ensureAdministrations);
carRoutes.delete("/delete/:license_plate", deleteCarController.handle);
carRoutes.post("/", createNewCarController.handle);
carRoutes.post(
  "/images/:license_plate",
  uploadSingleImage.single("carImage"),
  createCarImageController.handle
);
/* Just Admins - End */

export { carRoutes };
