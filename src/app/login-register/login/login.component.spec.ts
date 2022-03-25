import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let initialState = {
    id: '4f4f4f4f4f4f4f4',
    teamLeader: 'test',
    userName: 'test',
    name: 'test',
    admin: false,
    mail: 'test',
    token: '8k8k8k8k8k8',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
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

  describe('When handleSubmit is called with a valid form value', () => {
    it('Then it should login the user', () => {
      spyOn(component.auth, 'loginUser').and.returnValue(
        of({
          id: '4f4f4f4f4f4f4f4',
          teamLeader: 'test',
          userName: 'test',
          name: 'test',
          admin: false,
          mail: 'test',
          token: '8k8k8k8k8k8',
        })
      );
      spyOn(component.router, 'navigate');
      component.loginForm.controls['userName'].setValue('testUser');
      component.loginForm.controls['password'].setValue('12345');

      component.handleSubmit();

      expect(component.auth.loginUser).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeFalse();

      jasmine.clock().tick(2500);

      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('When handleSubmit is called with an invalid form value', () => {
    it('Then it should show an alert', () => {
      spyOn(component.auth, 'loginUser').and.returnValue(
        new Observable(() => {
          throw new Error('test error');
        })
      );
      component.loginForm.controls['userName'].setValue('testUser');
      component.loginForm.controls['password'].setValue('12345');

      component.handleSubmit();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When handleLogout is called', () => {
    it('Should logOut the user', () => {
      spyOn(component.store, 'dispatch').and.resolveTo();
      component.handleLogout();
      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });
});
