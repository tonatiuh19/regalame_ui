import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ThankYouComponent } from './landing/thank-you/thank-you.component';
import { ComitionsComponent } from './landing/comitions/comitions.component';
import { EarningsComponent } from './landing/earnings/earnings.component';
import { ProfileComponent } from './landing/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gracias', component: ThankYouComponent },
  { path: 'comisiones', component: ComitionsComponent },
  { path: 'mispagos', component: EarningsComponent },
  { path: 'miperfil', component: ProfileComponent },
  { path: ':username', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
