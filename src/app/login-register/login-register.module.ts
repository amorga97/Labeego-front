import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginRegisterModule {}
