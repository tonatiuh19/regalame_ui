import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditExtraModalComponent } from './edit-extra-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [EditExtraModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    BrowserAnimationsModule,
  ],
  exports: [EditExtraModalComponent],
})
export class EditExtraModalModule {}
