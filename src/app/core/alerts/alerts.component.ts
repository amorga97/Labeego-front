import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent {
  @Input() isError!: boolean;
  @Input() message!: string;
  @Input() active!: boolean;
  constructor() {}
}
