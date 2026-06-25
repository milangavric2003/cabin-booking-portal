import express from 'express'
import { VikendicaController } from '../controllers/vikendica.controller'


const vikendicaRouter = express.Router()

vikendicaRouter.route('/dohvatiSveVikendice').get(
    (req, res) => new VikendicaController().dohvatiSveVikendice(req, res)
)

vikendicaRouter.route('/dohvatiMojeVikendice').post(
    (req, res) => new VikendicaController().dohvatiMojeVikendice(req, res)
)

vikendicaRouter.route('/napraviVikendicu').post(
    (req, res) => new VikendicaController().napraviVikendicu(req, res)
)

vikendicaRouter.route('/dohvatiDetaljeVikendice').post(
    (req, res) => new VikendicaController().dohvatiDetaljeVikendice(req, res)
)

vikendicaRouter.route('/dohvatiBrojVikendica').get(
    (req, res) => new VikendicaController().dohvatiBrojVikendica(req, res)
)

vikendicaRouter.route('/obrisiVikendicu').post(
    (req, res) => new VikendicaController().obrisiVikendicu(req, res)
)

vikendicaRouter.route('/urediVikendicu').post(
    (req, res) => new VikendicaController().urediVikendicu(req, res)
)

export default vikendicaRouter