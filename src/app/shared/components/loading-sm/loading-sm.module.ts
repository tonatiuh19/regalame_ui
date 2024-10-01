import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSmComponent } from './loading-sm.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoadingSmComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LoadingSmComponent],
})
export class LoadingSmModule {}
