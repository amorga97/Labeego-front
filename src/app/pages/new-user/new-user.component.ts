import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  userData!: UserStore;
  newUserForm: FormGroup;
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  imageToUpload!: string;
  constructor(
    public store: Store<{ user: UserStore }>,
    public router: Router,
    public user: UserService,
    public fb: FormBuilder,
    public storage: AngularFireStorage
  ) {
    this.newUserForm = fb.group({
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
          Validators.maxLength(50),
          Validators.email,
        ],
      ],
    });
  }

  handleSubmit() {
    if (this.newUserForm.valid) {
      this.imageToUpload =
        'https://firebasestorage.googleapis.com/v0/b/final-isdi-coders.appspot.com/o/UserImages%2Fdef-user.png?alt=media&token=a2616ba2-25c3-4565-a8c0-e6b0c8a098a9';

      this.user
        .create(this.userData.token, {
          ...this.newUserForm.value,
          userImage: this.imageToUpload,
        })
        .subscribe({
          next: (data) => {
            this.alertIsActive = true;
            this.alertMessage = 'Usuario creado con éxito';
            setTimeout(() => {
              this.alertIsActive = false;
              this.alertMessage = '';
              this.router.navigate(['dashboard']);
            }, 2000);
          },
          error: () => {
            this.alertIsActive = true;
            this.alertIsError = true;
            this.alertMessage = 'Ha ocurrido un error creando el usuario';
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
      this.alertMessage = 'Completa todos los campos';
      setTimeout(() => {
        this.alertIsActive = false;
        this.alertIsError = false;
        this.alertMessage = '';
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
          if (!this.userData.admin) {
            this.router.navigate(['dashboard']);
          }
        },
      });
  }
}
