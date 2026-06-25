import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {
  
  constructor() { }
  http = inject(HttpClient)

  dodajRezervaciju(rez: Rezervacija) {
    return this.http.post<string>("http://localhost:4000/rezervacije/dodajRezervaciju", rez)
  }

  dohvatiMojeAktuelneRezervacije(kor_ime: string) {
    return this.http.post<Rezervacija[]>("http://localhost:4000/rezervacije/dohvatiMojeAktuelneRezervacije", {kor_ime})
  }

  dohvatiMojeNeobradjeneRezervacije(vlasnik: string) {
    return this.http.post<Rezervacija[]>("http://localhost:4000/rezervacije/dohvatiMojeNeobradjeneRezervacije", {vlasnik})
  }

  potvrdiIliOdbijRez(_id: string, status: string, komentarVlasnika: string) {
    const data = {
      _id: _id,
      status: status,
      komentarVlasnika: komentarVlasnika
    }
    return this.http.post<string>("http://localhost:4000/rezervacije/potvrdiIliOdbijRez", data)
  } 

  dohvatiBrojRezVikendicaVreme(dana: number) {
    return this.http.post<number>("http://localhost:4000/rezervacije/dohvatiBrojRezVikendicaVreme", {dana})
  }
}
