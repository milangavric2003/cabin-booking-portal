import { Component, inject, OnInit } from '@angular/core';
import { VikendicaService } from '../services/vikendica.service';
import { Vikendica } from '../models/vikendica';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-vikendice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vikendice.component.html',
  styleUrl: './vikendice.component.css'
})
export class VikendiceComponent implements OnInit{

  private vikendicaService = inject(VikendicaService)
  vikendice: Vikendica[] = []

  korisnik: Korisnik | null = null

  ngOnInit(): void {
    this.dohvatiSveVikendice()
    
    let u = localStorage.getItem("loggedUser")
    if(u) this.korisnik = JSON.parse(u)
  }

  private router = inject(Router)

  detaljiVikendice(vik: Vikendica) {
    localStorage.setItem("vikendica", JSON.stringify(vik))
  }

  naziv = ""
  mesto = ""

  pretrazi(){
    this.vikendicaService.dohvatiSveVikendice().subscribe(vik => {
      if(vik) {
        let n = this.naziv.toLowerCase().trim()
        let m = this.mesto.toLowerCase().trim()
        this.vikendice = vik.filter(v => {
          return v.naziv.toLowerCase().includes(n) 
            && v.mesto.toLowerCase().includes(m)
        })
      } else {
        this.messageV = "Neuspesno dohvatanje ili nema vikendica"
      }
    })
  }

  messageV = ""
  dohvatiSveVikendice() {
    this.vikendicaService.dohvatiSveVikendice().subscribe(vik => {
      if(vik){
        this.vikendice = vik
      } else {
        this.messageV = "Neuspesno dohvatanje ili nema vikendica"
      }
    })
  }

  rastucePoNazivu() {
    this.vikendice.sort((a, b) => {
      return a.naziv.localeCompare(b.naziv)
    })
  }
  rastucePoMestu() {
    this.vikendice.sort((a, b) => {
      return a.mesto.localeCompare(b.mesto)
    })
  }
  opadajucePoNazivu() {
    this.vikendice.sort((a, b) => {
      return b.naziv.localeCompare(a.naziv)
    })
  }
  opadajucePoMestu() {
    this.vikendice.sort((a, b) => {
      return b.mesto.localeCompare(a.mesto)
    })
  }

  sortiraj(event: any) {
    let kriterijum = event.target.value

    switch(kriterijum) {
      case 'Bez sortiranja': 
        this.dohvatiSveVikendice()
        break
      case 'Rastuce po nazivu':
        this.rastucePoNazivu()
        break
      case 'Rastuce po mestu':
        this.rastucePoMestu()
        break
      case 'Opadajuce po nazivu':
        this.opadajucePoNazivu()
        break
      case 'Opadajuce po mestu':
        this.opadajucePoMestu()
        break
    }
  }
}
