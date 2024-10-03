import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyTermsComponent } from './privacy-terms.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';

@NgModule({
  declarations: [PrivacyTermsComponent],
  imports: [CommonModule, HeaderModule, FooterModule],
  exports: [PrivacyTermsComponent],
})
export class PrivacyTermsModule {}
