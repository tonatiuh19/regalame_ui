import { Component } from '@angular/core';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-sm',
  templateUrl: './loading-sm.component.html',
  styleUrl: './loading-sm.component.css',
})
export class LoadingSmComponent {
  faMugHot = faMugHot;
}
