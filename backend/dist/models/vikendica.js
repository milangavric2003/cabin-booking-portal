"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vikendicaSchema = new mongoose_1.default.Schema({
    naziv: String,
    mesto: String,
    usluge: String,
    cenaNociLeti: Number,
    cenaNociZimi: Number,
    telefon: String,
    slike: (Array),
    vlasnik: String
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('VikendicaModel', vikendicaSchema, 'vikendice');
