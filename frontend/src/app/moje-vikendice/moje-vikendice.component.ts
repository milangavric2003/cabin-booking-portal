import { Component, inject, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Vikendica } from '../models/vikendica';
import { VikendicaService } from '../services/vikendica.service';
import { DetaljiVikendice } from '../models/detaljiVikendice';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moje-vikendice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './moje-vikendice.component.html',
  styleUrl: './moje-vikendice.component.css'
})
export class MojeVikendiceComponent implements OnInit{

  vlasnik = new Korisnik

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    if (u) this.vlasnik = JSON.parse(u)

    this.dohvatiMojeVikendice()
  }

  vikendice: Vikendica[] = []
  vikendicaService = inject(VikendicaService)
  messageV = ""

  dohvatiMojeVikendice() {
    this.vikendicaService.dohvatiMojeVikendice(this.vlasnik.kor_ime).subscribe(vik => {
      if(vik){
        this.vikendice = vik
      } else {
        this.messageV = "Neuspesno dohvatanje ili nema vikendica"
      }
    })
  }

  maxBrojSlika: number = 10

  novaVikendica = new DetaljiVikendice
  messageR = ""
  napraviVikendicu() {
    //provere
    let regexTelefon = /^(\+381|0)?6\d{7,8}$/
    if (!regexTelefon.test(this.novaVikendica.telefon)) {
      this.messageR = "Broj telefona nije u dobrom formatu!"
      return
    }

    if (this.novaVikendica.naziv == "" || this.novaVikendica.mesto == "" 
      || this.novaVikendica.cenaNociLeti < 0 || this.novaVikendica.cenaNociZimi < 0) {
      this.messageR = "Uneti podatke u ispravnom formatu. Naziv, mesto i telefon su obavezni!"
      return
    }

    this.novaVikendica.vlasnik = this.vlasnik.kor_ime
    this.vikendicaService.napraviVikendicu(this.novaVikendica).subscribe(msg => {
      if(msg != "ok"){
        alert(msg)
      } 
      this.messageR = ""
      this.dohvatiMojeVikendice()
    })
  }

  private router = inject(Router)
  urediVikendicu(vik: Vikendica) {
    localStorage.setItem("azuriranjeVikendice", JSON.stringify(vik))
    this.router.navigate(['vlasnik/uredi-vikendicu'])
  }

  obrisiVikendicu(vik: Vikendica) {
    this.vikendicaService.obrisiVikendicu(vik._id!).subscribe(msg => {
      if(msg != "ok"){
        alert(msg)
      } 
      this.dohvatiMojeVikendice()
    })
  }

  slikeSelected(event: any) {
    const files: FileList = event.target.files
    if (!files || files.length === 0) return

    if (files.length > this.maxBrojSlika) {
      alert(`Možete uneti najviše ${this.maxBrojSlika} slika.`)
      event.target.value = ""
      return
    }

    this.novaVikendica.slike = [] // reset ako korisnik ponovo izabere slike

    Array.from(files).forEach((file, index) => {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert(`Slika #${index + 1}: Dozvoljeni su samo .jpeg ili .png formati!`)
        return
      }

      const img = new Image()
      img.src = URL.createObjectURL(file)

      img.onload = () => {
        // Provera dimenzija
        if (img.width < 100 || img.height < 100 || img.width > 300 || img.height > 300) {
          alert(`Slika #${index + 1}: Dimenzije moraju biti između 100x100 i 300x300 px.`)
          return
        }

        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result as string
          this.novaVikendica.slike.push(base64)
        }
        reader.readAsDataURL(file)
      }
    })
  }

}
