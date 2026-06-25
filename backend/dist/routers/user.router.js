"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/promenaLozinke').post((req, res) => new user_controller_1.UserController().promenaLozinke(req, res));
userRouter.route('/azurirajProfil').post((req, res) => new user_controller_1.UserController().azurirajProfil(req, res));
userRouter.route('/dohvatiSveOdobreneKorisnike').get((req, res) => new user_controller_1.UserController().dohvatiSveOdobreneKorisnike(req, res));
userRouter.route('/dohvatiSveZahtevKorisnike').get((req, res) => new user_controller_1.UserController().dohvatiSveZahtevKorisnike(req, res));
userRouter.route('/promeniOdobren').post((req, res) => new user_controller_1.UserController().promeniOdobren(req, res));
userRouter.route('/dohvatiBrojRegKorisnikaTip').post((req, res) => new user_controller_1.UserController().dohvatiBrojRegKorisnikaTip(req, res));
exports.default = userRouter;
