import "reflect-metadata";
import "express-async-errors";
import "./modules/shared/infra/tsyringe/";
import express, { NextFunction, Response, Request } from "express";
import { AllRoutes } from "./routes";
import { AppError } from "./modules/shared/infra/middleware/AppError";

const app = express();

app.use(express.json());
app.use(AllRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: JSON.stringify(err.message),
  });
});

app.listen(3000, () => console.log("Server Is Running In Port 3000!"));
