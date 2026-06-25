import { Component, inject, OnInit } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { VikendicaService } from '../services/vikendica.service';
import { DetaljiVikendice } from '../models/detaljiVikendice';
import { FormsModule } from '@angular/forms';
import { Korisnik } from '../models/korisnik';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { Router } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalji-vikendice',
  standalone: true,
  imports: [FormsModule, LogoutComponent, DatePipe],
  templateUrl: './detalji-vikendice.component.html',
  styleUrl: './detalji-vikendice.component.css'
})
export class DetaljiVikendiceComponent implements OnInit{

  vikendica: Vikendica = new Vikendica
  korisnik: Korisnik = new Korisnik
  rezervacija: Rezervacija = new Rezervacija
  private router = inject(Router)

  ngOnInit(): void {
    let vik = localStorage.getItem("vikendica")
    if(vik) this.vikendica = JSON.parse(vik)

    let u = localStorage.getItem("loggedUser")
    if(u) this.korisnik = JSON.parse(u)

    this.dohvatiDetaljeVikendice(this.vikendica)
    this.prikaziLogoKartice()
  }

  messagePotvrda = ""
  rezervacijaService = inject(RezervacijaService)

  potvrdi() {
    if (this.logoImageSrc == "") {
      this.messagePotvrda = "Broj kreditne kartice nije u dobrom formatu!"
      return
    }

    //dodaj sve informacije u rezervaciju
    this.rezervacija.nazivVikendice = this.vikendica.naziv
    this.rezervacija.mestoVikendice = this.vikendica.mesto
    this.rezervacija.idVikendice = this.vikendica._id
    this.rezervacija.kor_ime = this.korisnik.kor_ime
    this.rezervacija.vlasnik = this.vikendica.vlasnik

    this.rezervacija.datumPodnosenjaZahteva = new Date()

    this.rezervacijaService.dodajRezervaciju(this.rezervacija).subscribe(msg => {
      if(msg == "ok") {
        this.messagePotvrda = "Uspesno ste poslali zahtev za rezervacijom"
        this.rezervacija = new Rezervacija()
        this.messagePotvrda = ""
        this.korak = 1
      } else {
        this.messagePotvrda = msg
      }
    })

  }

  korak = 1
  messageSledece = ""
  datumPocetka = ""
  datumKraja = ""

  sledece() {
    if(this.datumPocetka == "" || this.datumKraja == "") {
      this.messageSledece = "Uneti datum pocetka i kraja boravka"
      return
    }
    if(this.rezervacija.brojOdraslih < 1) {
      this.messageSledece = "Broj odraslih mora biti veci od 0"
      return
    }
    
    let poc = new Date(this.datumPocetka)
    let kraj = new Date(this.datumKraja)
    let sada = new Date()

    if(poc >= kraj) {
      this.messageSledece = "Datum dolaska mora biti pre odlaska"
      return
    }
    if(poc < sada) {
      this.messageSledece = "Datum dolaska mora biti u buducnosti"
      return
    }

    // za azuriranje objekta rezervacije
    let rezDatPoc = poc
    let rezDatKr = kraj

    let ukupnaCena = 0
    let trenutni = new Date(poc)

    // ako je dolazak pre 14h dodati jedno nocenje na cenu
    if (trenutni.getHours() < 14) {
      const mesec = trenutni.getMonth() + 1 // meseci od 0 krecu pa zato +1
      ukupnaCena += (mesec >= 5 && mesec <= 8) ? this.detaljiVikendice.cenaNociLeti : this.detaljiVikendice.cenaNociZimi
      rezDatPoc.setDate(rezDatPoc.getDate() - 1)
    }

    // brojimo noci
    while (trenutni.getFullYear() < kraj.getFullYear() ||
       (trenutni.getFullYear() === kraj.getFullYear() && trenutni.getMonth() < kraj.getMonth()) ||
       (trenutni.getFullYear() === kraj.getFullYear() && trenutni.getMonth() === kraj.getMonth() && trenutni.getDate() < kraj.getDate())) {
      const mesec = trenutni.getMonth() + 1
      ukupnaCena += (mesec >= 5 && mesec <= 8) ? this.detaljiVikendice.cenaNociLeti : this.detaljiVikendice.cenaNociZimi
      trenutni.setDate(trenutni.getDate() + 1)
    }

    // ako je odlazak posle 10h, dodajemo jednu noc
    if (kraj.getHours() > 10 || (kraj.getHours() === 10 && kraj.getMinutes() > 0)) {
      const mesec = kraj.getMonth() + 1
      ukupnaCena += (mesec >= 5 && mesec <= 8) ? this.detaljiVikendice.cenaNociLeti : this.detaljiVikendice.cenaNociZimi
      rezDatKr.setDate(rezDatKr.getDate() + 1)
    }
    this.rezervacija.cena = ukupnaCena * (this.rezervacija.brojOdraslih + this.rezervacija.brojDece)

    // da u objektu rezervacija imamo "yyyy-mm-dd" jer se lako konvertuje nazad u Date
    // let yyyy = rezDatPoc.getFullYear();
    // let mm = String(rezDatPoc.getMonth() + 1).padStart(2, '0'); // meseci su 0–11
    // let dd = String(rezDatPoc.getDate()).padStart(2, '0');
    // this.rezervacija.datumPocetka = `${yyyy}-${mm}-${dd}`;
    this.rezervacija.datumPocetka = rezDatPoc

    // yyyy = rezDatKr.getFullYear();
    // mm = String(rezDatKr.getMonth() + 1).padStart(2, '0'); // meseci su 0–11
    // dd = String(rezDatKr.getDate()).padStart(2, '0');
    // this.rezervacija.datumKraja = `${yyyy}-${mm}-${dd}`;
    this.rezervacija.datumKraja = rezDatKr

    this.messageSledece = ""
    this.korak = 2;
  }

  nazad() {
    this.korak = 1;
    this.messagePotvrda = ""
  }

  private vikendicaService = inject(VikendicaService)
  detaljiVikendice = new DetaljiVikendice

  dohvatiDetaljeVikendice(vik: Vikendica) {
    this.vikendicaService.dohvatiDetaljeVikendice(vik._id!).subscribe(detVik => {
      if(detVik) {
        this.detaljiVikendice = detVik
      } else {
        alert("Neuspesno dohvatanje detalja vikendice")
      }
    })
  }

  regexDiners = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
  regexMasterCard = /^(51|52|53|54|55)\d{14}$/
  regexVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
  logoImageSrc = ""

  prikaziLogoKartice() {
    if (this.regexDiners.test(this.korisnik.kartica)) {
      this.logoImageSrc = "diners.png"
    } else if (this.regexMasterCard.test(this.korisnik.kartica)) {
      this.logoImageSrc = "master.png"
    } else if (this.regexVisa.test(this.korisnik.kartica)) {
      this.logoImageSrc = "VISA-logo.png"
    } else {
      this.logoImageSrc = ""
    }
  }

  naPocetak() {
    this.router.navigate(["turista"])
  }
}
