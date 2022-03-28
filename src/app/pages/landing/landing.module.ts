import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import { RegisterComponent } from 'src/app/login-register/register/register.component';

import { LoginRegisterModule } from 'src/app/login-register/login-register.module';
import { LoginComponent } from 'src/app/login-register/login/login.component';

@NgModule({
  declarations: [LandingComponent, RegisterComponent, LoginComponent],
  imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}
