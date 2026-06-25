import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor() { }
  http = inject(HttpClient)

  login(u: String, p: String) {
    const data = {
      username: u,
      password: p
    }
    return this.http.post<Korisnik>("http://localhost:4000/korisnici/login", data)
  }

  register(k: Korisnik) {
    return this.http.post<string>("http://localhost:4000/korisnici/register", k)
  }

  promeniLozinku(kor_ime: String, staraL: String, novaL: String) {
    const data = {
      kor_ime: kor_ime, 
      staraL: staraL, 
      novaL: novaL
    }
    return this.http.post<string>("http://localhost:4000/korisnici/promenaLozinke", data)
  }

  azurirajProfil(k: Korisnik) {
    return this.http.post<string>("http://localhost:4000/korisnici/azurirajProfil", k)
  }

  dohvatiSveOdobreneKorisnike() {
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/dohvatiSveOdobreneKorisnike")
  }

  dohvatiSveZahtevKorisnike() {
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/dohvatiSveZahtevKorisnike")
  }

  promeniOdobren(kor_ime: string, odobren: string) {
    return this.http.post<string>("http://localhost:4000/korisnici/promeniOdobren", {kor_ime, odobren})
  }

  dohvatiBrojRegKorisnikaTip(tip: string) {
    return this.http.post<number>("http://localhost:4000/korisnici/dohvatiBrojRegKorisnikaTip", {tip})
  }

}
