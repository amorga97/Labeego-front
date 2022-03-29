import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/interfaces/interfaces';
import { logout } from 'src/app/store/user.actions';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss'],
})
export class UserBarComponent {
  @Input() user!: UserStore;
  constructor(public router: Router, public store: Store) {}

  handleClick(type: string) {
    type === 'logout'
      ? (() => {
          this.store.dispatch(logout());
          this.router.navigate(['login']);
        })()
      : this.router.navigate(['profile']);
  }

  goHome() {
    this.router.navigate(['dashboard']);
  }
}
