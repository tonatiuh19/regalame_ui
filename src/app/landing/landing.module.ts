import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, HeaderModule, FooterModule, FontAwesomeModule],
  exports: [LandingComponent],
})
export class LandingModule {}
