import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { mockInitialState, mockUser } from './mocks/mocks';

describe('AppComponent', () => {
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('When loading the app with a valid token in localStorage', () => {
    it('Should fecth the user data from the api with the token', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      spyOn(
        component.localStorageServ,
        'getDataFromLocalStorage'
      ).and.returnValue('token');
      spyOn(component.auth, 'loginUser').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      fixture.detectChanges();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });

  describe('When loading the app with an expired token in localStorage', () => {
    it('Should show an alert and navigate to login', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      spyOn(
        component.localStorageServ,
        'getDataFromLocalStorage'
      ).and.returnValue('token');
      spyOn(component.auth, 'loginUser').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      spyOn(component.store, 'dispatch');
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      expect(component.store.dispatch).not.toHaveBeenCalled();

      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.router.navigate).toHaveBeenCalled();
      expect(component.alertIsActive).toBeFalse();
      expect(component.alertIsError).toBeFalse();
    });
  });

  describe('When loading the app without a token in localStorage', () => {
    it('Should navigate to login', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      spyOn(
        component.localStorageServ,
        'getDataFromLocalStorage'
      ).and.returnValue(null);
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
