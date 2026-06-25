"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    kor_ime: String,
    lozinka: String,
    ime: String,
    prezime: String,
    pol: String,
    adresa: String,
    telefon: String,
    mejl: String,
    slika: String,
    kartica: String,
    tip: String,
    odobren: String // odbijen, odobren ili zahtev ili deaktiviran
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('UserModel', userSchema, 'korisnici');
