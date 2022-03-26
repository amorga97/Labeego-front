import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBarComponent } from './user-bar/user-bar.component';
import { AlertsComponent } from './alerts/alerts.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [UserBarComponent, AlertsComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [CommonModule, UserBarComponent, AlertsComponent],
})
export class CoreModule {}
