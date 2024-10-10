import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtrasComponent } from './extras.component';
import { HeaderModule } from '../../shared/components/header/header.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingMaskModule } from '../../shared/components/loading-mask/loading-mask.module';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ExtrasComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FontAwesomeModule,
    SidebarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LoadingMaskModule,
    DataViewModule,
    TagModule,
    ButtonModule,
  ],
  exports: [ExtrasComponent],
})
export class ExtrasModule {}
