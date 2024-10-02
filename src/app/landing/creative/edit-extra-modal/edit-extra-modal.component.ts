import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-extra-modal',
  templateUrl: './edit-extra-modal.component.html',
  styleUrl: './edit-extra-modal.component.css',
})
export class EditExtraModalComponent {
  @Input() isVisible: boolean = false;
}
