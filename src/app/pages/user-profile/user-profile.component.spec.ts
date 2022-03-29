import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { mockInitialState, mockUser } from 'src/app/mocks/mocks';

import { UserProfileComponent } from './user-profile.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ref } from 'firebase/storage';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        CoreModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling handleSubmit with valid params', () => {
    it('Should call on the api and dispatch an update action', () => {
      component.userDataForm.controls['userName'].setValue('testUserName');
      component.userDataForm.controls['name'].setValue('testName');
      component.userDataForm.controls['mail'].setValue('test@test.test');
      spyOn(component.user, 'update').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      component.handleSubmit();
      expect(component.user.update).toHaveBeenCalled();
      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling handleSubmit with invalid params', () => {
    it('Should call on the api and dispatch an update action', () => {
      component.userDataForm.controls['userName'].setValue('testUserName');
      component.userDataForm.controls['name'].setValue('testName');
      component.userDataForm.controls['mail'].setValue('test@test.test');
      spyOn(component.user, 'update').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      spyOn(component.store, 'dispatch');
      component.handleSubmit();
      expect(component.user.update).toHaveBeenCalled();
      expect(component.store.dispatch).not.toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
      expect(component.alertIsError).toBeFalse();
    });
  });

  describe('When calling handleImageUpdate uploading an image', () => {
    it('Should call storage.refFromUrl', () => {
      spyOn(component.user, 'update').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      spyOn(component.storage, 'refFromURL').and.returnValue({
        delete: () => {},
      } as AngularFireStorageReference);
      component.imageToUpload = 'url';
      component.handleImageUpdate();
      expect(component.user.update).toHaveBeenCalled();
      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.storage.refFromURL).toHaveBeenCalled();
    });
  });

  describe('When calling handleImageUpdate uploading an image but having api problems', () => {
    it('Should call storage.refFromUrl', () => {
      spyOn(component.user, 'update').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      spyOn(component.store, 'dispatch');
      spyOn(component.storage, 'refFromURL').and.returnValue({
        delete: () => {},
      } as AngularFireStorageReference);
      component.imageToUpload = 'url';
      component.handleImageUpdate();
      expect(component.user.update).toHaveBeenCalled();
      expect(component.store.dispatch).not.toHaveBeenCalled();
      expect(component.storage.refFromURL).not.toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling handleImageUpdate having uploaded an image', () => {
    it('Should call on the api and dispatch an update action', () => {
      spyOn(component.user, 'update').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      component.imageToUpload = 'url';
      component.handleImageUpdate();
      expect(component.user.update).toHaveBeenCalled();
      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling fileBrowseHandler', () => {
    it('Should call on the api and dispatch an update action', () => {
      spyOn(component.user, 'update').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      spyOn(component.storage, 'upload').and.resolveTo();
      component.imageToUpload = 'url';
      component.fileBrowseHandler({
        files: [new File(['this is a test'], 'test')],
      });
      expect(component.storage.upload).toHaveBeenCalled();
    });
  });

  describe('When calling component.toggleActive', () => {
    it('Should toggle the active property', () => {
      component.toggleActive();
      expect(component.active).toBeTrue();
    });
  });

  describe('When calling component.onSelect', () => {
    it('Should add the file to the list', () => {
      component.onSelect({ addedFiles: [new File(['test'], 'test')] });
      expect(component.active).toBeTrue();
    });
  });

  describe('When calling component.onRemove', () => {
    it('Should delete it from the storage', () => {
      spyOn(component.storage, 'refFromURL').and.returnValue({
        delete: () => {},
      } as AngularFireStorageReference);
      component.onRemove({ addedFiles: [new File(['test'], 'test')] });
      expect(component.storage.refFromURL).toHaveBeenCalled();
    });
  });
});
