import { AuthenticationClientController } from "@/modules/accounts/client/authentication/AutheticationController";
import { CreateNewClientController } from "@/modules/accounts/client/createClient/CreateNewClientController";

import { Router } from "express";

const clientRoutes = Router();

const createNewClientController = new CreateNewClientController();
const authenticationClientController = new AuthenticationClientController();

clientRoutes.post("/", createNewClientController.handle);
clientRoutes.post("/session", authenticationClientController.handle);

export { clientRoutes };
