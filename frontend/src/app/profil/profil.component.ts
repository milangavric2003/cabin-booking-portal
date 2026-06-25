import { Component, inject, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{

  korisnik = new Korisnik()
  korisnikNovi = new Korisnik()

  ngOnInit(): void {
    let u = localStorage.getItem("loggedUser")
    if (u) this.korisnik = JSON.parse(u)

    // this.korisnikNovi = this.korisnik
    this.korisnikNovi = { ...this.korisnik }
    this.prikaziLogoKartice()
  }

  imageSelected(event: any) {
    let file = event.target.files[0]
    if (!file) return

    // provera tipa fajla 
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert("Unesite .jpeg ili .png format slike!")
      this.korisnikNovi.slika = ""
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
        this.korisnikNovi.slika = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  regexDiners = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
  regexMasterCard = /^(51|52|53|54|55)\d{14}$/
  regexVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
  logoImageSrc = ""

  prikaziLogoKartice() {
    if (this.regexDiners.test(this.korisnikNovi.kartica)) {
      this.logoImageSrc = "diners.png"
    } else if (this.regexMasterCard.test(this.korisnikNovi.kartica)) {
      this.logoImageSrc = "master.png"
    } else if (this.regexVisa.test(this.korisnikNovi.kartica)) {
      this.logoImageSrc = "VISA-logo.png"
    } else {
      this.logoImageSrc = ""
    }
  }

  korisnikService = inject(KorisnikService)
  router = inject(Router)
  messageR = ""

  azurirajProfil() {

    if (this.logoImageSrc == "") {
      this.messageR = "Broj kreditne kartice nije u dobrom formatu!"
      return
    }

    let regexTelefon = /^(\+381|0)?6\d{7,8}$/
    if (!regexTelefon.test(this.korisnikNovi.telefon)) {
      this.messageR = "Broj telefona nije u dobrom formatu!"
      return
    }

    if (this.korisnikNovi.adresa == "") {
      this.messageR = "Uneti adresu!"
      return
    }

    let regexImePrezime = /^[A-Z][a-z]{2,}$/
    if (!regexImePrezime.test(this.korisnikNovi.ime) || !regexImePrezime.test(this.korisnikNovi.prezime)) {
      this.messageR = "Uneti ime i prezime u dobrom formatu!"
      return
    }

    let regexMail = /^[^\s@]+@[^\s@]{3,}\.[^\s@]+$/
    if (!regexMail.test(this.korisnikNovi.mejl)) {
      this.messageR = "Uneti mejl u dobrom formatu"
      return
    }

    this.korisnikService.azurirajProfil(this.korisnikNovi).subscribe(msg => {
      this.messageR = msg
      if(msg == "ok"){
        localStorage.setItem("loggedUser", JSON.stringify(this.korisnikNovi))
        //this.korisnik = this.korisnikNovi
        this.korisnik = { ...this.korisnikNovi }
      } else {
        alert(msg)
      }
    })
  }

  obrisiSliku() {
    this.korisnikNovi.slika = "default.jpeg"
  }

}
