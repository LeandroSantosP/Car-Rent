import { Router } from "express";
import { carRouter } from "./Car";
import { categoryRoutes } from "./Category";
import { specificationRoutes } from "./Specification";

const AllRoutes = Router();

AllRoutes.use("/category", categoryRoutes);

AllRoutes.use("/specification", specificationRoutes);

AllRoutes.use("/car", carRouter);

export { AllRoutes };
