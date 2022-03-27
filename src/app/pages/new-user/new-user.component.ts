import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
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
  isHovering = false;
  userImage: string = '';
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
          Validators.maxLength(15),
          Validators.email,
        ],
      ],
    });
  }

  @ViewChild('fileDropRef', { static: false }) fileDropEl!: ElementRef;
  files: any;
  fileBrowseHandler(files: any) {
    const image = files.files[0];
    const filePath = `UserImages/${Math.random() * 10000}${image.name}`;
    const imageRef = this.storage.ref(filePath);
    this.storage.upload(filePath, image).then(() => {
      getDownloadURL(ref(this.storage.storage, filePath)).then((url) => {
        this.userImage = url;
      });
    });
  }

  handleSubmit() {
    if (this.newUserForm.valid) {
      this.user
        .create(this.userData.token, {
          ...this.newUserForm.value,
          userImage: this.userImage,
        })
        .subscribe({
          next: (data) => {},
          error: () => {},
        });
    }
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
          if (!this.userData.admin) {
            this.router.navigate(['user-dash']);
          }
        },
      });
  }
}
