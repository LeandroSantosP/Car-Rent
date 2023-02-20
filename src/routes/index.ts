import { Router } from "express";
import { categoryRoutes } from "./Category";

const AllRoutes = Router();

AllRoutes.use("/category", categoryRoutes);

export { AllRoutes };
