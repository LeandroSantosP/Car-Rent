import { Router } from "express";
import { carRoutes } from "./Car";
import { categoryRoutes } from "./Category";
import { clientRoutes } from "./Client";
import { passwordRoutes } from "./PasswordRoutes";
import { rentalRoutes } from "./Rental";
import { specificationRoutes } from "./Specification";

const AllRoutes = Router();

AllRoutes.use("/category", categoryRoutes);

AllRoutes.use("/car", carRoutes);

AllRoutes.use("/car/specification", specificationRoutes);

AllRoutes.use("/client", clientRoutes);

AllRoutes.use("/rental", rentalRoutes);

AllRoutes.use("/password", passwordRoutes);

export { AllRoutes };
