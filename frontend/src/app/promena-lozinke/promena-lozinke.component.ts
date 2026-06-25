import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './promena-lozinke.component.html',
  styleUrl: './promena-lozinke.component.css'
})
export class PromenaLozinkeComponent {
  kor_ime = ""
  staraL = ""
  novaL = ""
  ponovljenaNovaL = ""

  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  message = ""
  promeniLozinku() {
    let regexPassword = /^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/
    if (this.kor_ime == "" || this.staraL == "" || this.novaL == "") {
      this.message = "Unesite sva polja"
    } else if (this.staraL == this.novaL) {
      this.message = "Stara i nova lozinka se moraju razlikovati"
    } else if (this.novaL != this.ponovljenaNovaL) {
      this.message = "Uneti istu lozinku za novu i ponovljenu"
    //} else if (!regexPassword.test(this.novaL)) {
    //  this.message = "Nova lozinka nije u dobrom formatu"
    } else {
      this.korisnikService.promeniLozinku(this.kor_ime, this.staraL, this.novaL).subscribe(msg => {
        this.message = msg
        if (msg == "ok") {
          this.router.navigate([""])
        }
      })
    }

  }

  naPocetak() {
    this.router.navigate([""])
  }
}
