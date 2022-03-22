import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboar-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  declarations: [UserDashboardComponent, ProjectCardComponent],
  imports: [UserDashboardRoutingModule, CommonModule, CoreModule],
})
export class UserDashboardModule {}
