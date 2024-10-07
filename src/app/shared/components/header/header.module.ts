import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalSignModule } from '../modal-sign/modal-sign.module';
import { UserNameSearcherModule } from '../../../landing/shared/components/user-name-searcher/user-name-searcher.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalSignModule,
    UserNameSearcherModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
