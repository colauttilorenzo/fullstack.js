import { Server } from './server/server';

// ----- CONFIGURATION ------
Server.SERVER_CONFIGURATION();
// ----- CONFIGURATION ------

// ---- api registration ----
import { UserService } from './services/user-service';
const user: UserService = new UserService();

import { LoginService } from './services/login-service';
const login: LoginService = new LoginService();

import { ConfigService } from './services/config-service';
const config: ConfigService = new ConfigService();
// ---- api registration ----

// ------- setting up -------
Server.start();
// ------- setting up -------