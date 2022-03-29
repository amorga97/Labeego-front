import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { RegisterComponent } from 'src/app/login-register/register/register.component';
import { LoginComponent } from 'src/app/login-register/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterModule } from 'src/app/login-register/login-register.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    LoginRegisterModule,
  ],
})
export class LandingModule {}
