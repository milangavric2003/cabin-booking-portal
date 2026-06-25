import { Component, inject, OnInit } from '@angular/core';
import { DetaljiVikendice } from '../models/detaljiVikendice';
import { Vikendica } from '../models/vikendica';
import { VikendicaService } from '../services/vikendica.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-uredi-vikendicu',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './uredi-vikendicu.component.html',
  styleUrl: './uredi-vikendicu.component.css'
})
export class UrediVikendicuComponent implements OnInit{

  vikendica = new Vikendica
  detaljiVikendice = new DetaljiVikendice
  private vikendicaService = inject(VikendicaService)

  ngOnInit(): void {
    let v = localStorage.getItem("azuriranjeVikendice")
    if(v) this.vikendica = JSON.parse(v)

    this.vikendicaService.dohvatiDetaljeVikendice(this.vikendica._id!).subscribe(vik => {
      this.detaljiVikendice = vik
    })
  }

  maxBrojSlika: number = 10

  messageR = ""
  urediVikendicu() {
    //provere
    let regexTelefon = /^(\+381|0)?6\d{7,8}$/
    if (!regexTelefon.test(this.detaljiVikendice.telefon)) {
      this.messageR = "Broj telefona nije u dobrom formatu!"
      return
    }

    if (this.detaljiVikendice.naziv == "" || this.detaljiVikendice.mesto == "" 
      || this.detaljiVikendice.cenaNociLeti < 0 || this.detaljiVikendice.cenaNociZimi < 0) {
      this.messageR = "Uneti podatke u ispravnom formatu. Naziv, mesto i telefon su obavezni!"
      return
    }
    
    this.vikendicaService.urediVikendicu(this.detaljiVikendice).subscribe(msg => {
      if(msg != "ok"){
        alert(msg)
      } 
      this.vikendicaService.dohvatiDetaljeVikendice(this.vikendica._id!).subscribe(vik => {
        this.detaljiVikendice = vik
      })
      this.messageR = "ok"
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

    this.detaljiVikendice.slike = [] // reset ako korisnik ponovo izabere slike

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
          this.detaljiVikendice.slike.push(base64)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  obrisiSlike() {
    this.detaljiVikendice.slike = []
  }

}
