"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vikendica_controller_1 = require("../controllers/vikendica.controller");
const vikendicaRouter = express_1.default.Router();
vikendicaRouter.route('/dohvatiSveVikendice').get((req, res) => new vikendica_controller_1.VikendicaController().dohvatiSveVikendice(req, res));
vikendicaRouter.route('/dohvatiMojeVikendice').post((req, res) => new vikendica_controller_1.VikendicaController().dohvatiMojeVikendice(req, res));
vikendicaRouter.route('/napraviVikendicu').post((req, res) => new vikendica_controller_1.VikendicaController().napraviVikendicu(req, res));
vikendicaRouter.route('/dohvatiDetaljeVikendice').post((req, res) => new vikendica_controller_1.VikendicaController().dohvatiDetaljeVikendice(req, res));
vikendicaRouter.route('/dohvatiBrojVikendica').get((req, res) => new vikendica_controller_1.VikendicaController().dohvatiBrojVikendica(req, res));
vikendicaRouter.route('/obrisiVikendicu').post((req, res) => new vikendica_controller_1.VikendicaController().obrisiVikendicu(req, res));
vikendicaRouter.route('/urediVikendicu').post((req, res) => new vikendica_controller_1.VikendicaController().urediVikendicu(req, res));
exports.default = vikendicaRouter;
