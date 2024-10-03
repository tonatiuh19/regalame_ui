import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [CommonModule, HeaderModule, FooterModule],
  exports: [TermsAndConditionsComponent],
})
export class TermsAndConditionsModule {}
