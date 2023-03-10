import { AuthenticationClientController } from "@/modules/accounts/client/usecases/authentication/AutheticationController";
import { AvatarImportController } from "@/modules/accounts/client/usecases/AvatarImport./AvatarImportContoller";
import { CreateNewClientController } from "@/modules/accounts/client/usecases/createClient/CreateNewClientController";
import uploadConfig from "@/modules/shared/utils/uploadConfig";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";

import { Router } from "express";
import multer from "multer";
import { GetClientInfosController } from "@/modules/accounts/client/usecases/GetClientInfos/GetClientInfosContoller";
import { RefreshTokenController } from "@/modules/accounts/client/usecases/RefreshToken/RefreshTokenController";
import { ClientProfileController } from "@/modules/accounts/client/usecases/ClientProfile/ClientProfileController";

const clientRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createNewClientController = new CreateNewClientController();
const authenticationClientController = new AuthenticationClientController();
const avatarImportController = new AvatarImportController();
const clientInfosController = new GetClientInfosController();
const refreshTokenController = new RefreshTokenController();
const clientProfileController = new ClientProfileController();

clientRoutes.post("/", createNewClientController.handle);
clientRoutes.post("/session", authenticationClientController.handle);
clientRoutes.post("/refresh-token", refreshTokenController.handle);
clientRoutes.use(EnsureAuthentication);
clientRoutes.get("/profile", clientProfileController.handle);
// clientRoutes.get("/", clientInfosController.handle);
clientRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  avatarImportController.handle
);

export { clientRoutes };
