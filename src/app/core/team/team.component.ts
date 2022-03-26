import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() team!: Partial<UserStore>[];
  constructor(public router: Router) {}

  handleNewUser() {
    this.router.navigate(['create-user']);
  }
}
