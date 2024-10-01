import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNameSearcherComponent } from './user-name-searcher.component';
import { LoadingSmModule } from '../../../../shared/components/loading-sm/loading-sm.module';

@NgModule({
  declarations: [UserNameSearcherComponent],
  imports: [CommonModule, LoadingSmModule],
  exports: [UserNameSearcherComponent],
})
export class UserNameSearcherModule {}
