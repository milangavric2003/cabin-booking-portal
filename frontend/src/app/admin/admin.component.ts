import { Component, inject, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { VikendicaService } from '../services/vikendica.service';
import { Vikendica } from '../models/vikendica';
import { AdminLogoutComponent } from "../admin-logout/admin-logout.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminLogoutComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  ngOnInit(): void {
    this.spisakKorak()
  }


  korak = 1
  spisakKorak() {
    this.dohvatiSveOdobreneKorisnike()
    this.korak = 1
  }
  zahteviKorak() {
    this.dohvatiSveZahtevKorisnike()
    this.korak = 2
  }
  vikendiceKorak() {
    this.dohvatiSveVikendice()
    this.korak = 3
  }

  korisnikService = inject(KorisnikService)
  odobreniKorisnici: Korisnik[] = []

  dohvatiSveOdobreneKorisnike() {
    this.korisnikService.dohvatiSveOdobreneKorisnike().subscribe(kor => {
      if(kor) this.odobreniKorisnici = kor
    })
  }

  zahtevKorisnici: Korisnik[] = []

  dohvatiSveZahtevKorisnike() {
    this.korisnikService.dohvatiSveZahtevKorisnike().subscribe(kor => {
      if(kor) this.zahtevKorisnici = kor
    })
  }

  private router = inject(Router)

  azurirajKorisnika(kor: Korisnik) {
    localStorage.setItem("azuriranjeKorisnika", JSON.stringify(kor))
    this.router.navigate(['azuriranje-korisnika'])
  }

  promeniOdobren(kor: Korisnik, odobren: string) {
    this.korisnikService.promeniOdobren(kor.kor_ime, odobren).subscribe(msg => {
      if(msg != "ok") alert(msg)
      this.dohvatiSveOdobreneKorisnike()
      this.dohvatiSveZahtevKorisnike()
    })
  }

  private vikendicaService = inject(VikendicaService)
  vikendice: Vikendica[] = []

  dohvatiSveVikendice() {
    this.vikendicaService.dohvatiSveVikendice().subscribe(vik => {
      if(vik) this.vikendice = vik
    })
  }

}
