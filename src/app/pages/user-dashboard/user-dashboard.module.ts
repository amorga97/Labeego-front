import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboar-routing.module';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [UserDashboardRoutingModule, CommonModule],
})
export class UserDashboardModule {}
