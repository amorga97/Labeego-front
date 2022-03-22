import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  template: ` <p>user-dashboard works!</p> `,
  styles: [],
})
export class UserDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('User dashboard rendered');
  }
}
