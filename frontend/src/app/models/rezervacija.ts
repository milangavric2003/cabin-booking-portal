export class Rezervacija {
    _id?: string
    datumPocetka = new Date()
    datumKraja = new Date()
    brojOdraslih = 0
    brojDece = 0
    opis = ""
    cena = 0

    nazivVikendice = ""
    mestoVikendice = ""
    idVikendice?: string
    kor_ime = ""
    vlasnik = ""
    status = "tekuci" // odbijen, odobren ili tekuci
    komentarVlasnika = ""

    datumPodnosenjaZahteva = new Date()
}