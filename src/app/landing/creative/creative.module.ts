import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreativeComponent } from './creative.component';
import { CoffeesCardModule } from './coffees-card/coffees-card.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentTypesInlineModule } from './payment-types-inline/payment-types-inline.module';
import { EditExtraModalModule } from './edit-extra-modal/edit-extra-modal.module';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { AlertToastModule } from '../../shared/components/alert-toast/alert-toast.module';
import { FansCardReviewsModule } from './fans-card-reviews/fans-card-reviews.module';

@NgModule({
  declarations: [CreativeComponent],
  imports: [
    CommonModule,
    CoffeesCardModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PaymentTypesInlineModule,
    EditExtraModalModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    FileUploadModule,
    AvatarModule,
    AlertToastModule,
    FansCardReviewsModule,
  ],
  exports: [CreativeComponent],
})
export class CreativeModule {}
