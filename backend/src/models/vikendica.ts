import mongoose from "mongoose";

const vikendicaSchema = new mongoose.Schema({
    naziv: String,
    mesto: String,
    usluge: String,
    cenaNociLeti: Number,
    cenaNociZimi: Number,
    telefon: String,
    slike: Array<String>,
    vlasnik: String
}, {
     versionKey: false 
   }
)

export default mongoose.model('VikendicaModel', vikendicaSchema, 'vikendice');
