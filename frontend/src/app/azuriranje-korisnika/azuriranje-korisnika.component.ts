import { Component, inject, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { AdminLogoutComponent } from "../admin-logout/admin-logout.component";

@Component({
  selector: 'app-azuriranje-korisnika',
  standalone: true,
  imports: [FormsModule, AdminLogoutComponent],
  templateUrl: './azuriranje-korisnika.component.html',
  styleUrl: './azuriranje-korisnika.component.css'
})
export class AzuriranjeKorisnikaComponent implements OnInit{

  azuriranjeKorisnika = new Korisnik

  ngOnInit(): void {
    let u = localStorage.getItem("azuriranjeKorisnika")
    if (u) this.azuriranjeKorisnika = JSON.parse(u)
  }

  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  messageR = ""

  azurirajProfil() {
  // let regexPassword = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/
  // if (!regexPassword.test(this.korisnikNovi.lozinka)){
  //   this.messageR = "Lozinka nije u dobrom formatu!"
  //   return
  // }

  // if (this.logoImageSrc == "") {
  //   this.messageR = "Broj kreditne kartice nije u dobrom formatu!"
  //   return
  // }

  // let regexTelefon = /^(\+381|0)?6\d{7,8}$/
  // if (!regexTelefon.test(this.korisnikNovi.telefon)) {
  //   this.messageR = "Broj telefona nije u dobrom formatu!"
  //   return
  // }

  // if (this.korisnikNovi.adresa == "") {
  //   this.messageR = "Uneti adresu!"
  //   return
  // }
  // if (this.korisnikNovi.kor_ime == "") {
  //   this.messageR = "Uneti korisnicko ime!"
  //   return
  // }

  // let regexImePrezime = /^[A-Z][a-z]{2,}$/
  // if (!regexImePrezime.test(this.korisnikNovi.ime) || !regexImePrezime.test(this.korisnikNovi.prezime)) {
  //   this.messageR = "Uneti ime i prezime u dobrom formatu!"
  //   return
  // }

  // if (this.korisnikNovi.pol == "") {
  //   this.messageR = "Uneti pol!"
  //   return
  // }
  // if (this.korisnikNovi.tip == "") {
  //   this.messageR = "Uneti tip!"
  //   return
  // }

  // let regexMail = /^[^\s@]+@[^\s@]{3,}\.[^\s@]+$/
  // if (!regexMail.test(this.korisnikNovi.mejl)) {
  //   this.messageR = "Uneti mejl u dobrom formatu"
  //   return
  // }

    this.korisnikService.azurirajProfil(this.azuriranjeKorisnika).subscribe(msg => {
      if(msg == "ok"){
        this.router.navigate(['admin'])
      } else {
          this.messageR = msg
      }
    })
  }

  imageSelected(event: any) {
    let file = event.target.files[0]
    if (!file) return

    // provera tipa fajla 
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert("Unesite .jpeg ili .png format slike!")
      this.azuriranjeKorisnika.slika = ""
      event.target.value = ""
      return;
    }

    let img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      // provera dimenzija
      if (img.width < 100 || img.height < 100 || img.width > 300 || img.height > 300) {
        alert('Unesite dobar format slike!')
        event.target.value = ""
        return
      }

      let reader = new FileReader()
      reader.onload = () => {
        this.azuriranjeKorisnika.slika = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  naPocetak() {
    this.router.navigate(["admin"])
  }

  obrisiSliku() {
    this.azuriranjeKorisnika.slika = "default.jpeg"
  }

}
