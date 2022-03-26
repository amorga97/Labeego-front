import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBarComponent } from './user-bar/user-bar.component';
import { AlertsComponent } from './alerts/alerts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TeamComponent } from './team/team.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [UserBarComponent, AlertsComponent, SidebarComponent, TeamComponent, ProjectListComponent, LayoutComponent, NavBarComponent],
  imports: [CommonModule],
  exports: [CommonModule, UserBarComponent, AlertsComponent],
})
export class CoreModule {}
