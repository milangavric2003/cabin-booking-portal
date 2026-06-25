import { Component, inject, OnInit } from '@angular/core';
import { VikendiceComponent } from "../vikendice/vikendice.component";
import { Vikendica } from '../models/vikendica';
import { VikendicaService } from '../services/vikendica.service';
import { RezervacijaService } from '../services/rezervacija.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-neregistrovani',
  standalone: true,
  imports: [VikendiceComponent],
  templateUrl: './neregistrovani.component.html',
  styleUrl: './neregistrovani.component.css'
})
export class NeregistrovaniComponent implements OnInit{

  brojVikendica = 0
  brojVlasnika = 0
  brojTurista = 0
  brojRezDan = 0
  brojRezNed = 0
  brojRezMes = 0

  ngOnInit(): void {
    this.dohvatiBrojVikendica()
    this.dohvatiBrojRegKorisnikaTip("turista")
    this.dohvatiBrojRegKorisnikaTip("vlasnik")
    this.dohvatiBrojRezVikendicaDan()
    this.dohvatiBrojRezMes()
    this.dohvatiBrojRezNed()
  }

  private vikendicaService = inject(VikendicaService)

  dohvatiBrojVikendica() {
    this.vikendicaService.dohvatiBrojVikendica().subscribe(br => {
      this.brojVikendica = br
    })
  }

  private korisnikService = inject(KorisnikService)

  dohvatiBrojRegKorisnikaTip(tip: string) {
    this.korisnikService.dohvatiBrojRegKorisnikaTip(tip).subscribe(br => {
      if(tip == "turista") this.brojTurista = br
      else if(tip == "vlasnik") this.brojVlasnika = br
    })
  }

  private rezervacijaService = inject(RezervacijaService)

  dohvatiBrojRezVikendicaDan() {
    this.rezervacijaService.dohvatiBrojRezVikendicaVreme(1).subscribe(br => {
      this.brojRezDan = br
    })
  }

  dohvatiBrojRezNed() {
    this.rezervacijaService.dohvatiBrojRezVikendicaVreme(7).subscribe(br => {
      this.brojRezNed = br
    })
  }

  dohvatiBrojRezMes() {
    this.rezervacijaService.dohvatiBrojRezVikendicaVreme(30).subscribe(br => {
      this.brojRezMes = br
    })
  }
  
}
