import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBarComponent } from './user-bar/user-bar.component';
import { AlertsComponent } from './alerts/alerts.component';



@NgModule({
  declarations: [
    UserBarComponent,
    AlertsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
