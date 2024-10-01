import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ThankYouComponent } from './landing/thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gracias', component: ThankYouComponent },
  { path: ':username', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
