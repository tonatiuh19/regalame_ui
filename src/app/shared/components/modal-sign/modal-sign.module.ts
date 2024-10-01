import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSignComponent } from './modal-sign.component';
import { UserNameSearcherModule } from '../../../landing/shared/components/user-name-searcher/user-name-searcher.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ModalSignComponent],
  imports: [CommonModule, UserNameSearcherModule, FontAwesomeModule],
  exports: [ModalSignComponent],
})
export class ModalSignModule {}
