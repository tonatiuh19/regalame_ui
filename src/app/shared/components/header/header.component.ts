import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() isMain = true;
  public isLogged = false;

  public user: any = {};

  faUserCircle = faUserCircle;

  private unsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login(): void {}

  logOut(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');

    const targetElement = document.getElementById('target-element');

    if (this.isMain) {
      if (navbar && targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const navbarHeight = navbar.offsetHeight;

        if (targetPosition <= navbarHeight) {
          navbar.classList.add('bg-light');
        } else {
          navbar.classList.remove('bg-light');
        }
      }
    } else {
      navbar ? navbar.classList.add('bg-light') : null;
    }
  }
}
