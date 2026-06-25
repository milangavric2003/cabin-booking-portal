import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NeregistrovaniComponent } from './neregistrovani/neregistrovani.component';
import { TuristaComponent } from './turista/turista.component';
import { ProfilComponent } from './profil/profil.component';
import { VikendiceComponent } from './vikendice/vikendice.component';
import { DetaljiVikendiceComponent } from './detalji-vikendice/detalji-vikendice.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { MojeVikendiceComponent } from './moje-vikendice/moje-vikendice.component';
import { RezervacijeComponent } from './rezervacije/rezervacije.component';
import { VlasnikRezervacijeComponent } from './vlasnik-rezervacije/vlasnik-rezervacije.component';
import { AdminComponent } from './admin/admin.component';
import { AzuriranjeKorisnikaComponent } from './azuriranje-korisnika/azuriranje-korisnika.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { UrediVikendicuComponent } from './uredi-vikendicu/uredi-vikendicu.component';
import { adminGuard } from './guards/admin.guard';
import { vlasnikGuard } from './guards/vlasnik.guard';
import { turistaGuard } from './guards/turista.guard';

export const routes: Routes = [
    {path: "", component: PocetnaComponent},
    {path: "login", component: LoginComponent}, 
    {path: "promena-lozinke", component: PromenaLozinkeComponent},
    {path: "registracija", component: RegistracijaComponent},
    {path: "admin-login", component: AdminLoginComponent},
    {path: "neregistrovani", component: NeregistrovaniComponent},
    {path: "turista", component: TuristaComponent, canActivate: [turistaGuard],
        children: [
            {path: 'profil', component: ProfilComponent},
            {path: '', component: ProfilComponent},
            {path: 'vikendice', component: VikendiceComponent},
            {path: 'rezervacije', component: RezervacijeComponent}
    ]},
    {path: "vlasnik", component: VlasnikComponent, canActivate: [vlasnikGuard],
        children: [
            {path: 'profil', component: ProfilComponent},
            {path: '', component: ProfilComponent},
            {path: 'moje-vikendice', component: MojeVikendiceComponent},
            {path: 'vlasnik-rezervacije', component: VlasnikRezervacijeComponent},
            {path: 'uredi-vikendicu', component: UrediVikendicuComponent}
        ]
    },
    {path: 'detalji-vikendice', component: DetaljiVikendiceComponent, canActivate: [turistaGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [adminGuard]},
    {path: 'azuriranje-korisnika', component: AzuriranjeKorisnikaComponent, canActivate: [adminGuard]}
];
