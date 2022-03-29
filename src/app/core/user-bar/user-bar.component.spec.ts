import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockUser } from 'src/app/mocks/mocks';

import { UserBarComponent } from './user-bar.component';

describe('UserBarComponent', () => {
  let component: UserBarComponent;
  let fixture: ComponentFixture<UserBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBarComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBarComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  describe('When calling component.handleClick with logout as a parameter', () => {
    it('Should navigate to the landing page', () => {
      spyOn(component.router, 'navigate');
      component.handleClick('logout');
      expect(component.router.navigate).toHaveBeenCalledWith(['login']);
    });
  });

  describe('When calling component.handleClick with profile as a parameter', () => {
    it('Should navigate to the profile of the user', () => {
      spyOn(component.router, 'navigate');
      component.handleClick('profile');
      expect(component.router.navigate).toHaveBeenCalledWith(['profile']);
    });
  });

  describe('When calling component.goHome', () => {
    it('Should navigate to the profile of the user', () => {
      spyOn(component.router, 'navigate');
      component.goHome();
      expect(component.router.navigate).toHaveBeenCalledWith(['dashboard']);
    });
  });
});
