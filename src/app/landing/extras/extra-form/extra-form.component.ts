import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-extra-form',
  templateUrl: './extra-form.component.html',
  styleUrl: './extra-form.component.css',
})
export class ExtraFormComponent {
  @Input() panelTitle!: string;
  @Input() panelButton: string = 'Crear';
  @Input() extraForm!: FormGroup;
  @Input() isLimitOfUsers!: boolean;
  @Output() closePanel = new EventEmitter<void>();
  @Output() submitExtra = new EventEmitter<void>();
  @Output() goToTermsAndConditions = new EventEmitter<void>();

  faXmark = faXmark;

  onClosePanel() {
    this.closePanel.emit();
  }

  onSubmitExtra() {
    this.submitExtra.emit();
  }

  goToTermsAndConditionsFunc() {
    this.goToTermsAndConditions.emit();
  }
}
