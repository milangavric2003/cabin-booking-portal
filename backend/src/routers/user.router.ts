import express from 'express'
import { UserController } from '../controllers/user.controller'


const userRouter = express.Router()

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/promenaLozinke').post(
    (req, res) => new UserController().promenaLozinke(req, res)
)

userRouter.route('/azurirajProfil').post(
    (req, res) => new UserController().azurirajProfil(req, res)
)

userRouter.route('/dohvatiSveOdobreneKorisnike').get(
    (req, res) => new UserController().dohvatiSveOdobreneKorisnike(req, res)
)

userRouter.route('/dohvatiSveZahtevKorisnike').get(
    (req, res) => new UserController().dohvatiSveZahtevKorisnike(req, res)
)

userRouter.route('/promeniOdobren').post(
    (req, res) => new UserController().promeniOdobren(req, res)
)

userRouter.route('/dohvatiBrojRegKorisnikaTip').post(
    (req, res) => new UserController().dohvatiBrojRegKorisnikaTip(req, res)
)

export default userRouter