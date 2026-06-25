import express from 'express'
import VikendicaModel from '../models/vikendica'
import RezervacijaModel from '../models/rezervacija'

export class VikendicaController{
    dohvatiSveVikendice = (req: express.Request, res: express.Response) => {

        VikendicaModel.find({},
             {_id: 1, naziv: 1, mesto: 1, vlasnik: 1})
        .then((vik) => {
            res.json(vik)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    dohvatiMojeVikendice = (req: express.Request, res: express.Response) => {
        VikendicaModel.find({vlasnik: req.body.kor_ime}, 
            {_id: 1, naziv: 1, mesto: 1, vlasnik: 1})
        .then((vik) => {
            res.json(vik)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    napraviVikendicu = (req: express.Request, res: express.Response) => {

        let vikObj = {
            naziv: req.body.naziv,
            mesto: req.body.mesto,
            usluge: req.body.usluge,
            cenaNociLeti: req.body.cenaNociLeti,
            cenaNociZimi: req.body.cenaNociZimi,
            telefon: req.body.telefon,
            slike: req.body.slike,
            vlasnik: req.body.vlasnik
        }

        new VikendicaModel(vikObj).save().then((ok) => {
            res.json("ok")
        }).catch((err) => {
            console.log(err)
            res.json("greska pravljena vikendice pri pristupu bazi")
        })
    }

    dohvatiDetaljeVikendice = (req: express.Request, res: express.Response) => {
        VikendicaModel.findOne({_id: req.body._id})
        .then((vik) => {
            res.json(vik)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    dohvatiBrojVikendica = (req: express.Request, res: express.Response) => {
        VikendicaModel.countDocuments({})
        .then((br) => {
            res.json(br)
        }).catch((err) => {
            console.log(err)
            res.json(-1)
        })
    }

    obrisiVikendicu = (req: express.Request, res: express.Response) => {
        VikendicaModel.deleteOne({_id: req.body._id})
        .then(result => {
            if (result.deletedCount == 1) {
                res.json("ok")
            } else {
                res.json("Vikendica nije pronađena.")
            }
        })
        .catch(err => {
            console.log(err)
            res.json("Greska pri pristupu bazi!")
        })
    }

    urediVikendicu = (req: express.Request, res: express.Response) => {
        let vikObj = {
            _id: req.body._id,
            naziv: req.body.naziv,
            mesto: req.body.mesto,
            usluge: req.body.usluge,
            cenaNociLeti: req.body.cenaNociLeti,
            cenaNociZimi: req.body.cenaNociZimi,
            telefon: req.body.telefon,
            slike: req.body.slike,
            vlasnik: req.body.vlasnik,
        };
        VikendicaModel.findOneAndUpdate({_id: req.body._id}, vikObj, {new: true, overwrite: true})
        .then(vik => {
            if(vik) {
                RezervacijaModel.updateMany({idVikendice: req.body._id}, 
                    {$set: {nazivVikendice: req.body.naziv, mestoVikendice: req.body.mesto}})
                .then(msg => {
                    res.json("ok")
                })
            } else {
                res.json("Vikendica nepronadjena")
            }
        })
        .catch(err => {
            console.log(err)
            res.json("neuspesno azuriranje")
        })

        
    }

}    