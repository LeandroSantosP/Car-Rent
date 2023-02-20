import { Router } from "express";
import { CreateNewCategoryController } from "../modules/cars/categories/CreataNewCategory/CreateNewCategoryController";

const categoryRoutes = Router();

const createNewCategory = new CreateNewCategoryController();

categoryRoutes.post("/", createNewCategory.handle);

export { categoryRoutes };
