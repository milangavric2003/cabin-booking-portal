import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
})

export default mongoose.model('UserModel', userSchema, 'korisnici');
