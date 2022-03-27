import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockUser } from 'src/app/mocks/mocks';

import { UserBarComponent } from './user-bar.component';

describe('UserBarComponent', () => {
  let component: UserBarComponent;
  let fixture: ComponentFixture<UserBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBarComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  describe('When calling component.handleClick', () => {
    it('Should navigate to the profile of the user', () => {
      spyOn(component.router, 'navigate');
      component.handleClick();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
