import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { mockUser } from 'src/app/mocks/mocks';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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

  describe('When calling handleSubmit with valid form values', () => {
    it('should register the user', () => {
      spyOn(component.auth, 'registerUser').and.returnValue(of(mockUser));
      spyOn(component.router, 'navigate');

      component.regForm.controls['userName'].setValue('testUserName');
      component.regForm.controls['name'].setValue('testName');
      component.regForm.controls['password'].setValue('testpassword');
      component.regForm.controls['mail'].setValue('test@test.test');

      component.handleSubmit();

      expect(component.auth.registerUser).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeFalse();

      jasmine.clock().tick(2500);

      expect(component.router.navigate).toHaveBeenCalled();
      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling handleSubmit with invalid form values', () => {
    it('Should display an alarm', () => {
      spyOn(component.auth, 'registerUser').and.returnValue(
        new Observable(() => {
          throw new Error('test error');
        })
      );

      component.regForm.controls['userName'].setValue('');
      component.regForm.controls['name'].setValue('');
      component.regForm.controls['password'].setValue('');
      component.regForm.controls['mail'].setValue('test');

      component.handleSubmit();

      expect(component.alertIsActive).toBeTrue;

      jasmine.clock().tick(2500);
    });
  });

  describe('When calling handleSubmit with valid form values but api fails', () => {
    it('should register the user', () => {
      spyOn(component.auth, 'registerUser').and.returnValue(
        new Observable(() => {
          throw new Error('Test');
        })
      );
      spyOn(component.router, 'navigate');

      component.regForm.controls['userName'].setValue('testUserName');
      component.regForm.controls['name'].setValue('testName');
      component.regForm.controls['password'].setValue('testpassword');
      component.regForm.controls['mail'].setValue('test@test.test');

      component.handleSubmit();

      expect(component.auth.registerUser).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.router.navigate).not.toHaveBeenCalled();
      expect(component.alertIsActive).toBeFalse();
    });
  });
});
