import { Router } from "express";
import { ActiveInactiveUserController } from "./controllers/active-inactive-user-controller";
import { AuthenticateUserController } from "./controllers/authenticate-user-controller";
import { CreateUsersController } from "./controllers/create-user-controller";
import { ListSpecificUserController } from "./controllers/list-specific-user-controller";
import { ListUsersController } from "./controllers/list-users-controller";
import { UpdateUserController } from "./controllers/update-user-controller";
import { ensureAdmin } from "./middleware/ensure-admin";
import { ensureAuthenticate } from "./middleware/ensure-authenticate";

export const routes = Router();

routes.post("/auth", new AuthenticateUserController().handle);

routes.get("/users", ensureAuthenticate, new ListUsersController().handle);
routes.get(
  "/users/:id",
  ensureAuthenticate,
  new ListSpecificUserController().handle
);
routes.post(
  "/users",
  ensureAuthenticate,
  ensureAdmin,
  new CreateUsersController().handle
);
routes.put("/users/:id", ensureAuthenticate, new UpdateUserController().handle);
routes.patch(
  "/users/:id",
  ensureAuthenticate,
  new ActiveInactiveUserController().handle
);

routes.post("/upload", () => {});
