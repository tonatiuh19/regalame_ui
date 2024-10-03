import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComitionsComponent } from './comitions.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ComitionsComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ComitionsComponent],
})
export class ComitionsModule {}
