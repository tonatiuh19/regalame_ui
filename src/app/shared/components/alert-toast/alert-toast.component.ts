import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-toast',
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.css'],
})
export class AlertToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() duration: number = 3000; // Duration in milliseconds
  isVisible: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.dismiss();
    }, this.duration);
  }

  dismiss(): void {
    this.isVisible = false;
  }
}
