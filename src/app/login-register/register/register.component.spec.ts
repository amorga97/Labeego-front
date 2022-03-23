import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [CommonModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling handleSubmit with valid form values', () => {
    it('should register the user', () => {
      spyOn(component.auth, 'registerUser').and.returnValue(
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

      component.regForm.controls['userName'].setValue('test');
      component.regForm.controls['name'].setValue('test');
      component.regForm.controls['password'].setValue('test');
      component.regForm.controls['mail'].setValue('test');

      component.handleSubmit();

      expect(component.auth.registerUser).toHaveBeenCalled();
    });
  });
});
