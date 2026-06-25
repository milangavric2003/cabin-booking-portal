import mongoose from "mongoose";

const rezervacijaSchema = new mongoose.Schema({
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
   }
)

export default mongoose.model('RezervacijaModel', rezervacijaSchema, 'rezervacije');


