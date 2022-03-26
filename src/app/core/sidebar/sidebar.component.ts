import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `<app-user-bar></app-user-bar>
    <app-project-list></app-project-list> <app-team></app-team>`,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor() {}
}
