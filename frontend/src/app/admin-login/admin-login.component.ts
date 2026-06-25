import { Component, inject } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
    username = ""
    password = ""
  
    private korisnikService = inject(KorisnikService)
    private router = inject(Router)
  
    messageL = ""
  
    login() {
      this.korisnikService.login(this.username, this.password).subscribe(user => {
        if(user){
          if(user.tip != 'admin') {
            this.messageL = "Ova stranica je samo za login administratora"
            return
          }
          if(user.odobren != 'odobren') {
            this.messageL = "Nije odobren zahtev za registraciju"
            return
          }
          
          if(!user.slika) user.slika = "default.jpeg"
          this.messageL = "Successfull login"

          localStorage.setItem('loggedUser', JSON.stringify(user))
          this.router.navigate(['admin'])

        } else {
          this.messageL = "Unsuccessfull login"
        }
      })
    }
}
