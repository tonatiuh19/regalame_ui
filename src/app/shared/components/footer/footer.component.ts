import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  faHeart = faHeart;

  constructor(private router: Router) {}

  goToTermsAndConditions() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['terminosycondiciones'])
      ),
      '_blank'
    );
  }

  goToPrivacyTerms() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['avisodeprivacidad'])
      ),
      '_blank'
    );
  }

  goToInstagram() {
    window.open('"https://www.instagram.com/regalameuncafe/', '_blank');
  }

  goToFacebook() {
    window.open('https://www.facebook.com/regalameuncafe/', '_blank');
  }

  goToMail() {
    window.open(
      'mailto:dihola@regalameuncafe.com?Subject=Hola%20equipo%20RegalameUnCafe',
      '_blank'
    );
  }
}
