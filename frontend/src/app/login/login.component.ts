import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ""
  password = ""

  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  messageL = ""

  login() {
    this.korisnikService.login(this.username, this.password).subscribe(user => {
      if(user){
        if(user.odobren == 'odbijen') {
          this.messageL = "Odbijen zahtev za registraciju"
          return
        } 
        if(user.odobren == "deaktiviran") {
          this.messageL = "Deaktiviran nalog"
          return
        }
        if(user.odobren == 'zahtev') {
          this.messageL = "Sacekajte na odobrenje zahteva za registraciju"
          return
        }
        if(user.tip == 'admin') {
          this.messageL = "Administrator ima svoju login stranicu"
          return
        }
        this.messageL = "Successfull login"
        if(!user.slika) user.slika = "default.jpeg"

        if(user.tip == "turista") {
          localStorage.setItem("loggedUser", JSON.stringify(user))
          this.router.navigate(['turista'])
        } else if (user.tip == 'vlasnik') {
          localStorage.setItem("loggedUser", JSON.stringify(user))
          this.router.navigate(['vlasnik'])
        }
      } else {
        this.messageL = "Unsuccessfull login"
      }
    })
  }

  // regexDiners = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
  // regexMasterCard = /^(51|52|53|54|55)\d{14}$/
  // regexVisa = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
  // logoImageSrc = ""

  // prikaziLogoKartice() {
  //   if (this.regexDiners.test(this.korisnik.kartica)) {
  //     this.logoImageSrc = "diners.png"
  //   } else if (this.regexMasterCard.test(this.korisnik.kartica)) {
  //     this.logoImageSrc = "master.png"
  //   } else if (this.regexVisa.test(this.korisnik.kartica)) {
  //     this.logoImageSrc = "VISA-logo.png"
  //   } else {
  //     this.logoImageSrc = ""
  //   }
  // }

  // korisnik: Korisnik = new Korisnik()
  // messageR = ""

  // imageSelected(event: any) {
  //   let file = event.target.files[0]
  //   if (!file) return

  //   // provera tipa fajla 
  //   if (!['image/jpeg', 'image/png'].includes(file.type)) {
  //     alert("Unesite .jpeg ili .png format slike!")
  //     this.korisnik.slika = ""
  //     event.target.value = ""
  //     return;
  //   }

  //   let img = new Image()
  //   img.src = URL.createObjectURL(file)
  //   img.onload = () => {
  //     // provera dimenzija
  //     if (img.width < 100 || img.height < 100 || img.width > 300 || img.height > 300) {
  //       alert('Unesite dobar format slike!')
  //       event.target.value = ""
  //       return
  //     }

  //     let reader = new FileReader()
  //     reader.onload = () => {
  //       this.korisnik.slika = reader.result as string
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  // register() {

  //   let regexPassword = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/
  //   if (!regexPassword.test(this.korisnik.lozinka)){
  //     this.messageR = "Lozinka nije u dobrom formatu!"
  //     return
  //   }

  //   if (this.logoImageSrc == "") {
  //     this.messageR = "Broj kreditne kartice nije u dobrom formatu!"
  //     return
  //   }

  //   let regexTelefon = /^(\+381|0)?6\d{7,8}$/
  //   if (!regexTelefon.test(this.korisnik.telefon)) {
  //     this.messageR = "Broj telefona nije u dobrom formatu!"
  //     return
  //   }

  //   if (this.korisnik.adresa == "") {
  //     this.messageR = "Uneti adresu!"
  //     return
  //   }
  //   if (this.korisnik.kor_ime == "") {
  //     this.messageR = "Uneti korisnicko ime!"
  //     return
  //   }

  //   let regexImePrezime = /^[A-Z][a-z]{2,}$/
  //   if (!regexImePrezime.test(this.korisnik.ime) || !regexImePrezime.test(this.korisnik.prezime)) {
  //     this.messageR = "Uneti ime i prezime u dobrom formatu!"
  //     return
  //   }

  //   if (this.korisnik.pol == "") {
  //     this.messageR = "Uneti pol!"
  //     return
  //   }
  //   if (this.korisnik.tip == "") {
  //     this.messageR = "Uneti tip!"
  //     return
  //   }

  //   let regexMail = /^[^\s@]+@[^\s@]{3,}\.[^\s@]+$/
  //   if (!regexMail.test(this.korisnik.mejl)) {
  //     this.messageR = "Uneti mejl u dobrom formatu"
  //     return
  //   }

  //   this.korisnikService.register(this.korisnik).subscribe(msg => {
  //     this.messageR = msg
  //   })
  // }

  naPocetak() {
    this.router.navigate([""])
  }
}
