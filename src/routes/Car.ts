import { ListAvailableCarsController } from "@/modules/cars/cars/usecases/ListCars/ListAvailableCarsController";
import { UploadCarImageController } from "@/modules/cars/cars/usecases/carImage/UploadCarImageController";
import { CreateNewCarController } from "@/modules/cars/cars/usecases/CreateNewCar/CreateNewCarController";
import { DeleteCarController } from "@/modules/cars/cars/usecases/deleteCar/DeleteCarController";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import { ensureAdministrations } from "@/modules/shared/infra/middleware/ensureAdministrations";
import uploadConfig from "@/modules/shared/utils/uploadConfig";
import { Router } from "express";
import multer from "multer";
import { CategoryOnCarController } from "@/modules/cars/cars/usecases/categoryOnCar/CategoryOnCarController";
const carRoutes = Router();

const createNewCarController = new CreateNewCarController();
const createCarImageController = new UploadCarImageController();
const listAvailableCarsController = new ListAvailableCarsController();
const deleteCarController = new DeleteCarController();
const categoryOnCategoryController = new CategoryOnCarController();
const uploadSingleImage = multer(uploadConfig);

carRoutes.get("/list", listAvailableCarsController.handle);
carRoutes.use(EnsureAuthentication);
/* Public */
/* Public - end*/
/* Just Client - Start */

/* Just Client - End */
/* Just Admins - Start */
carRoutes.use(ensureAdministrations);
carRoutes.delete("/delete/:license_plate", deleteCarController.handle);
carRoutes.post("/", createNewCarController.handle);
carRoutes.patch("/category", categoryOnCategoryController.handle);

carRoutes.post(
  "/images/:license_plate",
  uploadSingleImage.single("carImage"),
  createCarImageController.handle
);
/* Just Admins - End */

export { carRoutes };
