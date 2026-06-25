"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rezervacija_controller_1 = require("../controllers/rezervacija.controller");
const rezervacijaRouter = express_1.default.Router();
rezervacijaRouter.route('/dodajRezervaciju').post((req, res) => new rezervacija_controller_1.RezervacijaController().dodajRezervaciju(req, res));
rezervacijaRouter.route('/dohvatiMojeAktuelneRezervacije').post((req, res) => new rezervacija_controller_1.RezervacijaController().dohvatiMojeAktuelneRezervacije(req, res));
rezervacijaRouter.route('/dohvatiMojeNeobradjeneRezervacije').post((req, res) => new rezervacija_controller_1.RezervacijaController().dohvatiMojeNeobradjeneRezervacije(req, res));
rezervacijaRouter.route('/potvrdiIliOdbijRez').post((req, res) => new rezervacija_controller_1.RezervacijaController().potvrdiIliOdbijRez(req, res));
rezervacijaRouter.route('/dohvatiBrojRezVikendicaVreme').post((req, res) => new rezervacija_controller_1.RezervacijaController().dohvatiBrojRezVikendicaVreme(req, res));
exports.default = rezervacijaRouter;
