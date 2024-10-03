import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ThankYouComponent } from './landing/thank-you/thank-you.component';
import { ComitionsComponent } from './landing/comitions/comitions.component';
import { EarningsComponent } from './landing/earnings/earnings.component';
import { ProfileComponent } from './landing/profile/profile.component';
import { TermsAndConditionsComponent } from './landing/terms-and-conditions/terms-and-conditions.component';
import { PrivacyTermsComponent } from './landing/privacy-terms/privacy-terms.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gracias', component: ThankYouComponent },
  { path: 'comisiones', component: ComitionsComponent },
  { path: 'mispagos', component: EarningsComponent },
  { path: 'miperfil', component: ProfileComponent },
  { path: 'terminosycondiciones', component: TermsAndConditionsComponent },
  { path: 'avisodeprivacidad', component: PrivacyTermsComponent },
  { path: ':username', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
