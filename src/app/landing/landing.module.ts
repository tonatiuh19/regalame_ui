import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteSvgCarouselModule } from './shared/components/infinite-svg-carousel/infinite-svg-carousel.module';
import { UserNameSearcherModule } from './shared/components/user-name-searcher/user-name-searcher.module';
import { LandingStoreModule } from './shared/store/landing.store.module';
import { AuthModule } from '@auth0/auth0-angular';
import { ModalSignModule } from '../shared/components/modal-sign/modal-sign.module';
import { LoadingMaskModule } from '../shared/components/loading-mask/loading-mask.module';
import { CreativeModule } from './creative/creative.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FontAwesomeModule,
    InfiniteSvgCarouselModule,
    UserNameSearcherModule,
    LandingStoreModule,
    ModalSignModule,
    LoadingMaskModule,
    CreativeModule,
    AuthModule.forRoot({
      domain: 'dev-awc4vpkkzroxivyw.us.auth0.com',
      clientId: 'le6E7j4Rg4rkNZGoMJrlehW7KZPGQilA',
      authorizationParams: {
        redirect_uri: window.location.origin,
        ui_locales: 'es',
      },
    }),
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
