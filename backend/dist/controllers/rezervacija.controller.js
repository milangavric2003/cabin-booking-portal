"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RezervacijaController = void 0;
const rezervacija_1 = __importDefault(require("../models/rezervacija"));
class RezervacijaController {
    constructor() {
        this.dodajRezervaciju = (req, res) => {
            let datPocReq = new Date(req.body.datumPocetka);
            let datKrajReq = new Date(req.body.datumKraja);
            let yyyy = datPocReq.getFullYear();
            let mm = String(datPocReq.getMonth() + 1).padStart(2, '0'); // meseci su 0–11
            let dd = String(datPocReq.getDate()).padStart(2, '0');
            let datPoc = `${yyyy}-${mm}-${dd}`;
            yyyy = datKrajReq.getFullYear();
            mm = String(datKrajReq.getMonth() + 1).padStart(2, '0'); // meseci su 0–11
            dd = String(datKrajReq.getDate()).padStart(2, '0');
            let datKraj = `${yyyy}-${mm}-${dd}`;
            const idVik = req.body.idVikendice;
            rezervacija_1.default.findOne({ idVikendice: idVik, status: { $in: ["odobren", "tekuci"] },
                $and: [{ datumPocetka: { $lt: datKraj } }, { datumKraja: { $gt: datPoc } }
                ] }).then(rez => {
                if (rez) {
                    res.json(`Vikendica je zauzeta u periodu od ${rez.datumPocetka} do ${rez.datumKraja}`);
                }
                else {
                    let rezObj = {
                        //datumPocetka: req.body.datumPocetka,
                        //datumKraja: req.body.datumKraja,
                        datumPocetka: datPoc,
                        datumKraja: datKraj,
                        brojOdraslih: req.body.brojOdraslih,
                        brojDece: req.body.brojDece,
                        opis: req.body.opis,
                        cena: req.body.cena,
                        nazivVikendice: req.body.nazivVikendice,
                        mestoVikendice: req.body.mestoVikendice,
                        idVikendice: req.body.idVikendice,
                        kor_ime: req.body.kor_ime,
                        vlasnik: req.body.vlasnik,
                        status: req.body.status, // odbijen, odobren ili tekuci
                        komentarVlasnika: req.body.komentarVlasnika,
                        datumPodnosenjaZahteva: req.body.datumPodnosenjaZahteva
                    };
                    new rezervacija_1.default(rezObj).save().then((ok) => {
                        res.json("ok");
                    });
                }
            }).catch(err => {
                console.log(err);
                res.json("Greska pri zahtevu za rezervaciju vikendice, pri pristupu bazi");
            });
        };
        this.dohvatiMojeAktuelneRezervacije = (req, res) => {
            let sad = new Date();
            let yyyy = sad.getFullYear();
            let mm = String(sad.getMonth() + 1).padStart(2, '0'); // meseci su 0–11
            let dd = String(sad.getDate()).padStart(2, '0');
            let sadString = `${yyyy}-${mm}-${dd}`;
            rezervacija_1.default.find({ kor_ime: req.body.kor_ime, datumKraja: { $gte: sadString } })
                .then((rez) => {
                res.json(rez);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.dohvatiMojeNeobradjeneRezervacije = (req, res) => {
            rezervacija_1.default.find({ vlasnik: req.body.vlasnik, status: 'tekuci' })
                .then((rez) => {
                res.json(rez);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.potvrdiIliOdbijRez = (req, res) => {
            rezervacija_1.default.updateOne({ _id: req.body._id }, { $set: { status: req.body.status, komentarVlasnika: req.body.komentarVlasnika } })
                .then((result) => {
                if (result.matchedCount == 0) {
                    res.json("Nepostojeca rezervacija");
                }
                else {
                    res.json("ok");
                }
            }).catch((err) => {
                console.log(err);
                res.json("Greska pri pristupu bazi");
            });
        };
        this.dohvatiBrojRezVikendicaVreme = (req, res) => {
            const sada = new Date();
            const pre = new Date(sada.getTime() - req.body.dana * 24 * 60 * 60 * 1000);
            rezervacija_1.default.distinct("idVikendice", {
                status: "odobren",
                $expr: {
                    $gte: [
                        { $toDate: "$datumPodnosenjaZahteva" },
                        pre
                    ]
                }
            })
                .then((rez) => {
                res.json(rez.length);
            }).catch((err) => {
                console.log(err);
                res.json(-1);
            });
        };
    }
}
exports.RezervacijaController = RezervacijaController;
