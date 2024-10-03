import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarningsComponent } from './earnings.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { LoadingMaskModule } from '../../shared/components/loading-mask/loading-mask.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [EarningsComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    LoadingMaskModule,
    FontAwesomeModule,
    ButtonModule,
    TooltipModule,
  ],
  exports: [EarningsComponent],
})
export class EarningsModule {}
