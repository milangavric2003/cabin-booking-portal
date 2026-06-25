"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// u backend folderu: 
// npm install bcrypt
// npm install --save-dev @types/bcrypt
// u package.json dev dependencies:     "@types/bcrypt": "^6.0.0",
// mozda: npm install cors
// npm install @types/cors --save-dev
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let pass = req.body.password;
            user_1.default.findOne({ kor_ime: username })
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user)
                    res.json(null);
                else {
                    let lozinkaIsta = yield bcrypt_1.default.compare(pass, user.lozinka); // kriptovana lozinka
                    if (lozinkaIsta)
                        res.json(user);
                    else
                        res.json(null);
                }
            })).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let rounds = 10;
            let cryptedPassword = yield bcrypt_1.default.hash(req.body.lozinka, rounds);
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
            user_1.default.findOne({ $or: [{ kor_ime: userObject.kor_ime }, { mejl: userObject.mejl }] })
                .then(user => {
                if (user) {
                    res.json("Vec postoji korisnik sa ovim korisnickim imenom ili mejlom");
                }
                else {
                    new user_1.default(userObject).save().then(ok => {
                        res.json("ok");
                    }).catch((err) => {
                        console.log(err);
                        res.json("failed registration");
                    });
                }
            })
                .catch(err => {
                console.log(err);
                res.json("failed registration");
            });
        });
        this.promenaLozinke = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let kor_ime = req.body.kor_ime;
            let staraL = req.body.staraL;
            let novaL = req.body.novaL;
            let user = yield user_1.default.findOne({ kor_ime: kor_ime, odobren: "odobren" });
            if (!user) {
                res.json("Nepostojece korisnicko ime!");
                return;
            }
            let lozinkaIsta = yield bcrypt_1.default.compare(staraL, user.lozinka);
            if (!lozinkaIsta) {
                res.json("Pogresna lozinka!");
                return;
            }
            let rounds = 10;
            let cryptedPassword = yield bcrypt_1.default.hash(novaL, rounds);
            user_1.default.updateOne({ kor_ime: kor_ime, odobren: "odobren" }, { $set: { lozinka: cryptedPassword } })
                .then((result) => {
                if (result.matchedCount == 0) {
                    res.json("Nepostojece korisnicko ime ili lozinka!");
                }
                else {
                    res.json("ok");
                }
            }).catch((err) => {
                console.log(err);
                res.json("Greska pri pristupu bazi");
            });
        });
        this.azurirajProfil = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            user_1.default.findOneAndUpdate({ kor_ime: req.body.kor_ime }, userObject, { new: true, overwrite: true })
                .then(user => {
                if (user) {
                    res.json("ok");
                }
                else {
                    res.json("Korisnicko ime nepornadjeno");
                }
            })
                .catch(err => {
                console.log(err);
                res.json("neuspesno azuriranje");
            });
        });
        this.dohvatiSveOdobreneKorisnike = (req, res) => {
            user_1.default.find({ odobren: 'odobren', tip: { $in: ['turista', 'vlasnik'] } })
                .then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.dohvatiSveZahtevKorisnike = (req, res) => {
            user_1.default.find({ odobren: 'zahtev', tip: { $in: ['turista', 'vlasnik'] } })
                .then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
                res.json(null);
            });
        };
        this.promeniOdobren = (req, res) => {
            user_1.default.updateOne({ kor_ime: req.body.kor_ime }, { $set: { odobren: req.body.odobren } })
                .then(user => {
                if (user) {
                    res.json("ok");
                }
                else {
                    res.json("Korisnicko ime nepornadjeno");
                }
            })
                .catch(err => {
                console.log(err);
                res.json("neuspesno odbijanje");
            });
        };
        this.dohvatiBrojRegKorisnikaTip = (req, res) => {
            user_1.default.countDocuments({ tip: req.body.tip, odobren: "odobren" })
                .then((br) => {
                res.json(br);
            }).catch((err) => {
                console.log(err);
                res.json(-1);
            });
        };
    }
}
exports.UserController = UserController;
