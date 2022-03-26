import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { mockInitialState, mockUser } from 'src/app/mocks/mocks';

import { UserProfileComponent } from './user-profile.component';

fdescribe('UserProfileComponent', () => {
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
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    });
  });

  describe('When calling uploading an image and handleImageUpdate with valid params', () => {
    it('Should call on the api and dispatch an update action', () => {
      spyOn(component.user, 'update').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      component.handleImageUpdate();
      expect(component.user.update).toHaveBeenCalled();
      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });
});
