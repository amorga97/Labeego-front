import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ifProject, UserStore } from 'src/app/interfaces/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-sidebar',
  template: `<app-user-bar [user]="userData"></app-user-bar>
    <app-project-list></app-project-list>
    <app-team [team]="userData.team"></app-team>`,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userData!: UserStore;
  projects!: ifProject[];

  constructor(public store: Store<{ user: UserStore }>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
        },
      });
  }
}
