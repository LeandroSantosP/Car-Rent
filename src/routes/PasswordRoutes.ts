import { ResetPasswordController } from "@/modules/accounts/client/usecases/ResetPassword/ResetPasswordController";
import { SendForgetPasswordMailController } from "@/modules/accounts/client/usecases/SendforgetPasswordMail/SendForgetPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgetEmailController = new SendForgetPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forget", sendForgetEmailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
