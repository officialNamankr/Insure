import { Container } from "inversify";

import UserController from "./controllers/user.controller";
import UserService from "./services/user-service";
import UserRepo from "./repos/user-repo";

const container = new Container();
container.bind<UserController>(UserController).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<UserRepo>(UserRepo).toSelf();

export default container;