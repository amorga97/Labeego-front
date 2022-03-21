import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as user from '../../store/user.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store
  ) {
    this.regForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      name: [
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
      mail: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.email,
        ],
      ],
    });
  }

  handleSubmit() {
    this.auth.registerUser(this.regForm.value).subscribe((data) => {
      this.store.dispatch(user.login({ userData: { ...data } }));
    });
  }

  handleClick() {
    console.log('pepe');
  }

  ngOnInit(): void {
    console.log('Form loaded');
  }
}
