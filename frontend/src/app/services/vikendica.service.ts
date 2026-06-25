import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { DetaljiVikendice } from '../models/detaljiVikendice';

@Injectable({
  providedIn: 'root'
})
export class VikendicaService {

  constructor() { }
  http = inject(HttpClient)

  dohvatiSveVikendice() {
    return this.http.get<Vikendica[]>("http://localhost:4000/vikendice/dohvatiSveVikendice")
  }

  dohvatiMojeVikendice(kor_ime: string) {
    return this.http.post<Vikendica[]>("http://localhost:4000/vikendice/dohvatiMojeVikendice", {kor_ime})
  }

  napraviVikendicu(vik: Vikendica) {
    return this.http.post<string>("http://localhost:4000/vikendice/napraviVikendicu", vik)
  }

  dohvatiDetaljeVikendice(_id: string) {
    return this.http.post<DetaljiVikendice>("http://localhost:4000/vikendice/dohvatiDetaljeVikendice", {_id})
  }

  dohvatiBrojVikendica() {
    return this.http.get<number>("http://localhost:4000/vikendice/dohvatiBrojVikendica")
  }

  obrisiVikendicu(_id: string) {
    return this.http.post<string>("http://localhost:4000/vikendice/obrisiVikendicu", {_id})
  }

  urediVikendicu(vik: DetaljiVikendice){
    return this.http.post<string>("http://localhost:4000/vikendice/urediVikendicu", vik)
  }
}
