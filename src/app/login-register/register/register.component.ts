import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as user from '../../store/user.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
    public router: Router,
    public localStorage: LocalStorageService
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
          Validators.minLength(5),
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
      this.auth
        .registerUser({
          ...this.regForm.value,
          userImage:
            'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png',
        })
        .subscribe({
          next: (data) => {
            this.store.dispatch(user.saveUser({ userData: { ...data } }));
            this.localStorage.saveDataToLocalStorage(data.token);
            this.router.navigate(['dashboard']).then(() => {
              window.location.reload();
            });
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
