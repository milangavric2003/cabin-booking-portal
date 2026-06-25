import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LogoutComponent } from "../logout/logout.component";

@Component({
  selector: 'app-turista',
  standalone: true,
  imports: [RouterLink, RouterOutlet, LogoutComponent],
  templateUrl: './turista.component.html',
  styleUrl: './turista.component.css'
})
export class TuristaComponent {

}
