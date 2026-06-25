import express from 'express'
import UserModel from '../models/user'
import bcrypt from 'bcrypt' 
// u backend folderu: 
// npm install bcrypt
// npm install --save-dev @types/bcrypt
// u package.json dev dependencies:     "@types/bcrypt": "^6.0.0",

// mozda: npm install cors
// npm install @types/cors --save-dev

export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let pass = req.body.password

        UserModel.findOne({kor_ime: username})
        .then(async (user) => {
            if (!user) res.json(null)
            else {
                let lozinkaIsta = await bcrypt.compare(pass, user.lozinka!) // kriptovana lozinka
                if (lozinkaIsta) res.json (user)
                else res.json(null)
            }
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    register = async (req: express.Request, res: express.Response) => {
        let rounds = 10
        let cryptedPassword = await bcrypt.hash(req.body.lozinka, rounds)

        let userObject = {
            kor_ime: req.body.kor_ime,
            lozinka: cryptedPassword, // kriptovana lozinka se cuva u bazi
            ime: req.body.ime,
            prezime: req.body.prezime,
            pol: req.body.pol,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            slika: req.body.slika,
            kartica: req.body.kartica,
            tip: req.body.tip,
            odobren: "zahtev"
        };

        UserModel.findOne({ $or: [{ kor_ime: userObject.kor_ime }, { mejl: userObject.mejl }] })
        .then(user => {
            if (user) {
                res.json("Vec postoji korisnik sa ovim korisnickim imenom ili mejlom")
            } else {
                new UserModel(userObject).save().then(ok => {
                    res.json("ok")
                }).catch((err) => {
                    console.log(err)
                    res.json("failed registration")
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json("failed registration")
        })

    }

    promenaLozinke = async (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let staraL = req.body.staraL
        let novaL = req.body.novaL

        let user = await UserModel.findOne({kor_ime: kor_ime, odobren: "odobren"})
        if (!user) {
            res.json("Nepostojece korisnicko ime!")
            return
        } 

        let lozinkaIsta = await bcrypt.compare(staraL, user.lozinka!)
        if (!lozinkaIsta) {
            res.json("Pogresna lozinka!")
            return
        }

        let rounds = 10
        let cryptedPassword = await bcrypt.hash(novaL, rounds)

        UserModel.updateOne({kor_ime: kor_ime, odobren: "odobren"}, {$set: {lozinka: cryptedPassword}})
        .then((result) => {
            if (result.matchedCount == 0) {
                res.json("Nepostojece korisnicko ime ili lozinka!")
            } else {
                res.json("ok")
            }
        }).catch((err) => {
            console.log(err)
            res.json("Greska pri pristupu bazi")
        })
    }

    azurirajProfil = async (req: express.Request, res: express.Response) => {
        let userObject = {
            kor_ime: req.body.kor_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            pol: req.body.pol,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            slika: req.body.slika,
            kartica: req.body.kartica,
            tip: req.body.tip,
            odobren: req.body.odobren
        };
        UserModel.findOneAndUpdate({kor_ime: req.body.kor_ime}, userObject, {new: true, overwrite: true})
        .then(user => {
            if(user) {
                res.json("ok")
            } else {
                res.json("Korisnicko ime nepornadjeno")
            }
        })
        .catch(err => {
            console.log(err)
            res.json("neuspesno azuriranje")
        })

        
    }

    dohvatiSveOdobreneKorisnike = (req: express.Request, res: express.Response) => {

        UserModel.find({odobren: 'odobren', tip: {$in: ['turista', 'vlasnik']}})
        .then((user) => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }


    dohvatiSveZahtevKorisnike = (req: express.Request, res: express.Response) => {

        UserModel.find({odobren: 'zahtev', tip: {$in: ['turista', 'vlasnik']}})
        .then((user) => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    promeniOdobren = (req: express.Request, res: express.Response) => {
        
        UserModel.updateOne({kor_ime: req.body.kor_ime}, {$set: {odobren: req.body.odobren}})
        .then(user => {
            if(user) {
                res.json("ok")
            } else {
                res.json("Korisnicko ime nepornadjeno")
            }
        })
        .catch(err => {
            console.log(err)
            res.json("neuspesno odbijanje")
        })

    }

    dohvatiBrojRegKorisnikaTip = (req: express.Request, res: express.Response) => {
        UserModel.countDocuments({tip: req.body.tip, odobren: "odobren"})
        .then((br) => {
            res.json(br)
        }).catch((err) => {
            console.log(err)
            res.json(-1)
        })
    }

}