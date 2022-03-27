import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { updateUser } from 'src/app/store/user.actions';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData!: UserStore;
  userDataForm!: FormGroup;
  userImage!: string;
  imageToUpload: string | undefined = undefined;
  alertIsError: boolean = false;
  alertIsActive: boolean = false;
  alertMessage!: string;
  constructor(
    public store: Store<{ user: UserStore }>,
    private fb: FormBuilder,
    public user: UserService,
    public storage: AngularFireStorage
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
    const filePath = `UserImages/${Math.random() * 10000}${image.name}`;
    this.storage.upload(filePath, image).then((data) => {
      data.ref.getDownloadURL().then((url) => {
        this.imageToUpload = url;
        document
          .getElementsByClassName('user-data__image-preview')[0]
          .setAttribute('src', this.imageToUpload);
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
          this.alertIsActive = true;
          this.alertMessage = 'Datos actualizados';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertMessage = '';
          }, 1500);
        },
        error: () => {
          this.alertIsActive = true;
          this.alertIsError = true;
          this.alertMessage = 'Ha ocurrido un error actualizando tus datos';
          setTimeout(() => {
            this.alertIsActive = false;
            this.alertIsError = false;
            this.alertMessage = '';
          }, 1500);
        },
      });
  }

  handleImageUpdate() {
    if (this.imageToUpload) {
      this.user
        .update(
          this.userData.token,
          { userImage: this.imageToUpload as string },
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
            this.alertIsActive = true;
            this.alertMessage = 'Imagen actualizada';
            setTimeout(() => {
              this.alertIsActive = false;
              this.alertMessage = '';
            }, 1500);
            this.imageToUpload = undefined;
          },
          error: () => {
            this.alertIsActive = true;
            this.alertIsError = true;
            this.alertMessage = 'Ha ocurrido un error actualizando tu imagen';
            setTimeout(() => {
              this.alertIsActive = false;
              this.alertIsError = false;
              this.alertMessage = '';
            }, 1500);
            this.imageToUpload = undefined;
          },
        });
      try {
        this.storage.refFromURL(this.userData.userImage).delete().subscribe();
      } catch (err) {}
    } else {
      this.alertIsActive = true;
      this.alertIsError = true;
      this.alertMessage = 'Sube una imagen para actualizar';
      setTimeout(() => {
        this.alertIsActive = false;
        this.alertIsError = false;
        this.alertMessage = '';
      }, 1500);
    }
  }

  ngOnInit(): void {
    this.store
      .select((store) => store.user)
      .subscribe({
        next: (data) => {
          this.userData = data;
          const { name, userName, mail } = this.userData;
          this.userDataForm.setValue({ name, userName, mail });
        },
      });
  }
}
