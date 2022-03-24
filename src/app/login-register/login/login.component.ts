import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as user from '../../store/user.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public auth: AuthService,
    private router: Router,
    public localStorage: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  handleSubmit() {
    this.auth.loginUser(undefined, this.loginForm.value).subscribe({
      next: (data) => {
        this.store.dispatch(user.saveUser({ userData: { ...data } }));
        this.localStorage.saveDataToLocalStorage(data.token);
        this.router.navigate(['user-dash']);
      },
    });
  }

  handleLogout() {
    this.store.dispatch(user.logout());
  }

  ngOnInit(): void {
    console.log('Form loaded');
  }
}
