import { Router } from "express";
import { carRouter } from "./Car";
import { categoryRoutes } from "./Category";
import { clientRoutes } from "./Client";
import { specificationRoutes } from "./Specification";

const AllRoutes = Router();

AllRoutes.use("/category", categoryRoutes);

AllRoutes.use("/specification", specificationRoutes);

AllRoutes.use("/car", carRouter);

AllRoutes.use("/client", clientRoutes);

export { AllRoutes };
