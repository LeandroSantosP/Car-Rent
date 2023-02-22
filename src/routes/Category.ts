import { ensureAdministrations } from "@/modules/shared/infra/middleware/ensureAdministrations";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";
import { Router } from "express";
import { CreateNewCategoryController } from "../modules/cars/categories/CreataNewCategory/CreateNewCategoryController";
import multer from "multer";
import { ImportNewCategoryController } from "@/modules/cars/categories/importNewCategory/importNewCategoryController";
const categoryRoutes = Router();

const upload = multer({ dest: "./tmp" });
const importNewCategoryController = new ImportNewCategoryController();
const createNewCategory = new CreateNewCategoryController();

categoryRoutes.post(
  "/import",
  upload.single("file"),
  importNewCategoryController.handle
);
categoryRoutes.use(EnsureAuthentication);
categoryRoutes.use(ensureAdministrations);
categoryRoutes.post("/", createNewCategory.handle);

export { categoryRoutes };
