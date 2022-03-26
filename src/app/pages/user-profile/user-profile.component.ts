import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { UserStore } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { updateUser } from 'src/app/store/user.actions';
import { storage } from 'src/app/utils/firebase';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData!: UserStore;
  userDataForm!: FormGroup;
  userImage!: string;
  imageRef!: string;
  constructor(
    public store: Store<{ user: UserStore }>,
    private fb: FormBuilder,
    public user: UserService
  ) {
    this.userDataForm = this.fb.group({
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
    console.log('logging on button call', files.files[0]);
    const imageRef = ref(storage, `${Math.random() * 10000}${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        this.userImage = url;
        console.log(this.userImage);
      });
    });
  }

  handleSubmit() {
    this.user
      .update(
        this.userData.token,
        { ...this.userDataForm.value },
        this.userData.id
      )
      .subscribe({
        next: (data: any) => {
          this.store.dispatch(
            updateUser({
              userData: {
                userName: data.userName,
                name: data.name,
                mail: data.mail,
              },
            })
          );
        },
        error: () => {},
      });
  }

  handleImageUpdate() {
    this.user
      .update(
        this.userData.token,
        { userImage: this.userImage },
        this.userData.id
      )
      .subscribe({
        next: (data: any) => {
          this.store.dispatch(
            updateUser({
              userData: {
                userImage: data.userImage,
              },
            })
          );
        },
        error: () => {},
      });
    try {
      deleteObject(ref(storage, this.imageRef));
    } catch (err) {}
  }

  getPathStorageFromUrl(url: String) {
    const baseUrl =
      'https://firebasestorage.googleapis.com/v0/b/final-isdi-coders.appspot.com/o/';
    let imagePath: string = url.replace(baseUrl, '');
    const indexOfEndPath = imagePath.indexOf('?');
    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = imagePath.replace('%2F', '/');

    return imagePath;
  }

  ngOnInit(): void {
    this.store
      .select((store) => store.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
          const { name, userName, mail } = this.userData;
          this.userDataForm.setValue({ name, userName, mail });
          this.imageRef = this.getPathStorageFromUrl(
            this.userData.userImage as string
          );
        },
      });
  }
}
