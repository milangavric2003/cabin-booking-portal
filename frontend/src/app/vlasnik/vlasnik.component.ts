import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { LogoutComponent } from "../logout/logout.component";

@Component({
  selector: 'app-vlasnik',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LogoutComponent],
  templateUrl: './vlasnik.component.html',
  styleUrl: './vlasnik.component.css'
})
export class VlasnikComponent {

}
