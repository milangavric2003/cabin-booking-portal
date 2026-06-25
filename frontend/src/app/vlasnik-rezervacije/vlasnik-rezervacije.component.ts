import { Component, inject, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vlasnik-rezervacije',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './vlasnik-rezervacije.component.html',
  styleUrl: './vlasnik-rezervacije.component.css'
})
export class VlasnikRezervacijeComponent implements OnInit{

  vlasnik = new Korisnik

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    if (u) this.vlasnik = JSON.parse(u)

    this.dohvatiMojeNeobradjeneRezervacije()
  }

  rezervacijaService = inject(RezervacijaService)
  rezervacije: Rezervacija[] = []

  dohvatiMojeNeobradjeneRezervacije() {
    this.rezervacijaService.dohvatiMojeNeobradjeneRezervacije(this.vlasnik.kor_ime).subscribe(rez => {
      this.rezervacije = rez
      this.rezervacije.forEach(r => {
        r.datumPodnosenjaZahteva = new Date(r.datumPodnosenjaZahteva)
        r.datumPocetka = new Date(r.datumPocetka)
        r.datumKraja = new Date(r.datumKraja)
      })
      this.sortOdNajskorijih()
    })
  }

  sortOdNajskorijih() {
    this.rezervacije.sort((a, b) => {
      if(a.datumPodnosenjaZahteva > b.datumPodnosenjaZahteva) return -1
      else if(a.datumPodnosenjaZahteva == b.datumPodnosenjaZahteva) return 0
      else return 1
    })
  }

  potvrdi(rez: Rezervacija) {
    this.rezervacijaService.potvrdiIliOdbijRez(rez._id!, 'odobren', rez.komentarVlasnika).subscribe(msg => {
      if(msg != "ok") alert(msg)
      this.dohvatiMojeNeobradjeneRezervacije()
      this.messageOdb = ""
    })
  }

  messageOdb = ""
  odbij(rez: Rezervacija) {
    if(rez.komentarVlasnika == "") {
      this.messageOdb = "Obavezan je komentar pri odbijanju rezervacije"
      return
    }
    this.rezervacijaService.potvrdiIliOdbijRez(rez._id!, 'odbijen', rez.komentarVlasnika).subscribe(msg => {
      if(msg != "ok") alert(msg)
      this.dohvatiMojeNeobradjeneRezervacije()
      this.messageOdb = ""
    })
  }

}
