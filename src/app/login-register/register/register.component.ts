import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as user from '../../store/user.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  regForm: FormGroup;
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private store: Store,
    public router: Router
  ) {
    this.regForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      mail: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.email,
        ],
      ],
    });
  }

  handleSubmit() {
    if (this.regForm.valid) {
      this.auth.registerUser(this.regForm.value).subscribe({
        next: (data) => {
          this.store.dispatch(user.saveUser({ userData: { ...data } }));
          this.alertIsActive = true;
          this.alertMessage = 'Te has registrado con éxito';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertMessage = '';
            this.router.navigate(['dashboard']);
          }, 2000);
        },
        error: () => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage = 'Ha ocurrido un problema, prueba de nuevo';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
            this.alertMessage = '';
          }, 2000);
        },
      });
    } else {
      this.alertIsActive = true;
      this.alertIsError = true;
      this.alertMessage =
        'Introduce datos válidos en todos los campos del formulario';
      setTimeout(() => {
        this.alertIsActive = false;
        this.alertIsError = false;
        this.alertMessage = '';
      }, 2000);
    }
  }
}
