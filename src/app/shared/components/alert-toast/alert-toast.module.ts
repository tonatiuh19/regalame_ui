import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertToastComponent } from './alert-toast.component';

@NgModule({
  declarations: [AlertToastComponent],
  imports: [CommonModule],
  exports: [AlertToastComponent],
})
export class AlertToastModule {}
