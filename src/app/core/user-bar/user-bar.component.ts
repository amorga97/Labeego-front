import { Component, Input, OnInit } from '@angular/core';
import { UserStore } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss'],
})
export class UserBarComponent {
  @Input() user!: UserStore;
  constructor() {}
}
