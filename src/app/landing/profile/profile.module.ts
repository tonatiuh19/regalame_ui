import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { LoadingMaskModule } from '../../shared/components/loading-mask/loading-mask.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    LoadingMaskModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
