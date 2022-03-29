import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CoreModule],
  exports: [LoginComponent, RegisterComponent],
})
export class LoginRegisterModule {}
