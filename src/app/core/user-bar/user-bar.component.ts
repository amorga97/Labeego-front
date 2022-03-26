import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss'],
})
export class UserBarComponent {
  @Input() user!: UserStore;
  constructor(public router: Router) {}

  handleClick() {
    this.router.navigate(['profile']);
  }
}
