import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserStore } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-dashboard',
  template: ` <h1>Hola, {{ userData.name }}</h1> `,
  styles: [],
})
export class UserDashboardComponent implements OnInit {
  userData!: UserStore;
  constructor(private store: Store<{ user: UserStore }>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        console.log(data);
        this.userData = data;
      });
  }
}
