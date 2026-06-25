import { Component, inject, OnInit } from '@angular/core';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/korisnik';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rezervacije',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './rezervacije.component.html',
  styleUrl: './rezervacije.component.css'
})
export class RezervacijeComponent implements OnInit{

  korisnik = new Korisnik

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    if (u) this.korisnik = JSON.parse(u)

    this.dohvatiMojeAktuelneRezervacije()
  }

  rezervacijaService = inject(RezervacijaService)
  rezervacije: Rezervacija[] = []

  dohvatiMojeAktuelneRezervacije() {
    this.rezervacijaService.dohvatiMojeAktuelneRezervacije(this.korisnik.kor_ime).subscribe(rez => {
      this.rezervacije = rez
      this.rezervacije.forEach(r => {
        r.datumPocetka = new Date(r.datumPocetka)
        r.datumKraja = new Date(r.datumKraja)
      })
    })
  }

}
