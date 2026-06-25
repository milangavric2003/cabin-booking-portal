import { Component } from '@angular/core';
import { NeregistrovaniComponent } from "../neregistrovani/neregistrovani.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  standalone: true,
  imports: [NeregistrovaniComponent, RouterLink],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css'
})
export class PocetnaComponent {

}
