import express from 'express'
import { RezervacijaController } from '../controllers/rezervacija.controller'


const rezervacijaRouter = express.Router()

rezervacijaRouter.route('/dodajRezervaciju').post(
    (req, res) => new RezervacijaController().dodajRezervaciju(req, res)
)

rezervacijaRouter.route('/dohvatiMojeAktuelneRezervacije').post(
    (req, res) => new RezervacijaController().dohvatiMojeAktuelneRezervacije(req, res)
)

rezervacijaRouter.route('/dohvatiMojeNeobradjeneRezervacije').post(
    (req, res) => new RezervacijaController().dohvatiMojeNeobradjeneRezervacije(req, res)
)

rezervacijaRouter.route('/potvrdiIliOdbijRez').post(
    (req, res) => new RezervacijaController().potvrdiIliOdbijRez(req, res)
)

rezervacijaRouter.route('/dohvatiBrojRezVikendicaVreme').post(
    (req, res) => new RezervacijaController().dohvatiBrojRezVikendicaVreme(req, res)
)

export default rezervacijaRouter