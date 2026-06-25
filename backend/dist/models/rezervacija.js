"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rezervacijaSchema = new mongoose_1.default.Schema({
    datumPocetka: String,
    datumKraja: String,
    brojOdraslih: Number,
    brojDece: Number,
    opis: String,
    cena: Number,
    nazivVikendice: String,
    mestoVikendice: String,
    idVikendice: String,
    kor_ime: String,
    vlasnik: String,
    status: String, // odbijen, odobren ili tekuci
    komentarVlasnika: String,
    datumPodnosenjaZahteva: String
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('RezervacijaModel', rezervacijaSchema, 'rezervacije');
