import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  template: `<app-user-bar [user]="userData"></app-user-bar>
    <app-project-list *ngIf="isProjectRoute"></app-project-list>
    <app-team [team]="userData.team"></app-team>`,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userData!: UserStore;
  projects!: ifProject[];
  isProjectRoute!: any;
  id!: string;

  constructor(
    public store: Store<{ user: UserStore }>,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
        },
      });
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.isProjectRoute =
      this.route.snapshot.paramMap.get('id') === null ? false : true;
  }
}
