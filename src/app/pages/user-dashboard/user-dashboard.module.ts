import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboar-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { NewProjectComponent } from './new-project/new-project.component';

@NgModule({
  declarations: [UserDashboardComponent, ProjectCardComponent, NewProjectComponent],
  imports: [UserDashboardRoutingModule, CommonModule, CoreModule],
})
export class UserDashboardModule {}
