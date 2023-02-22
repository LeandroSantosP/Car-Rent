import { AuthenticationClientController } from "@/modules/accounts/client/authentication/AutheticationController";
import { AvatarImportController } from "@/modules/accounts/client/AvatarImport./AvatarImportContoller";
import { CreateNewClientController } from "@/modules/accounts/client/createClient/CreateNewClientController";
import uploadConfig from "@/modules/shared/utils/uploadConfig";
import { EnsureAuthentication } from "@/modules/shared/infra/middleware/ensureAuthentication";

import { Router } from "express";
import multer from "multer";

const clientRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createNewClientController = new CreateNewClientController();
const authenticationClientController = new AuthenticationClientController();
const avatarImportController = new AvatarImportController();

clientRoutes.post("/", createNewClientController.handle);
clientRoutes.post("/session", authenticationClientController.handle);
clientRoutes.use(EnsureAuthentication);
clientRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  avatarImportController.handle
);

export { clientRoutes };
