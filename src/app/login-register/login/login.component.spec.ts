import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterModule,
      ],
      providers: [provideMockStore()],
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
      component.loginForm.controls['userName'].setValue('testUser');
      component.loginForm.controls['password'].setValue('12345');

      component.handleSubmit();

      expect(component.auth.loginUser).toHaveBeenCalled();
    });
  });
});
