"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VikendicaController = void 0;
const vikendica_1 = __importDefault(require("../models/vikendica"));
const rezervacija_1 = __importDefault(require("../models/rezervacija"));
class VikendicaController {
    constructor() {
        this.dohvatiSveVikendice = (req, res) => {
            vikendica_1.default.find({}, { _id: 1, naziv: 1, mesto: 1, vlasnik: 1 })
                .then((vik) => {
                res.json(vik);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.dohvatiMojeVikendice = (req, res) => {
            vikendica_1.default.find({ vlasnik: req.body.kor_ime }, { _id: 1, naziv: 1, mesto: 1, vlasnik: 1 })
                .then((vik) => {
                res.json(vik);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.napraviVikendicu = (req, res) => {
            let vikObj = {
                naziv: req.body.naziv,
                mesto: req.body.mesto,
                usluge: req.body.usluge,
                cenaNociLeti: req.body.cenaNociLeti,
                cenaNociZimi: req.body.cenaNociZimi,
                telefon: req.body.telefon,
                slike: req.body.slike,
                vlasnik: req.body.vlasnik
            };
            new vikendica_1.default(vikObj).save().then((ok) => {
                res.json("ok");
            }).catch((err) => {
                console.log(err);
                res.json("greska pravljena vikendice pri pristupu bazi");
            });
        };
        this.dohvatiDetaljeVikendice = (req, res) => {
            vikendica_1.default.findOne({ _id: req.body._id })
                .then((vik) => {
                res.json(vik);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.dohvatiBrojVikendica = (req, res) => {
            vikendica_1.default.countDocuments({})
                .then((br) => {
                res.json(br);
            }).catch((err) => {
                console.log(err);
                res.json(-1);
            });
        };
        this.obrisiVikendicu = (req, res) => {
            vikendica_1.default.deleteOne({ _id: req.body._id })
                .then(result => {
                if (result.deletedCount == 1) {
                    res.json("ok");
                }
                else {
                    res.json("Vikendica nije pronađena.");
                }
            })
                .catch(err => {
                console.log(err);
                res.json("Greska pri pristupu bazi!");
            });
        };
        this.urediVikendicu = (req, res) => {
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
            vikendica_1.default.findOneAndUpdate({ _id: req.body._id }, vikObj, { new: true, overwrite: true })
                .then(vik => {
                if (vik) {
                    rezervacija_1.default.updateMany({ idVikendice: req.body._id }, { $set: { nazivVikendice: req.body.naziv, mestoVikendice: req.body.mesto } })
                        .then(msg => {
                        res.json("ok");
                    });
                }
                else {
                    res.json("Vikendica nepronadjena");
                }
            })
                .catch(err => {
                console.log(err);
                res.json("neuspesno azuriranje");
            });
        };
    }
}
exports.VikendicaController = VikendicaController;
