import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { mockInitialState, mockUser } from 'src/app/mocks/mocks';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/storage';
import { NewUserComponent } from './new-user.component';

fdescribe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserComponent],
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
    fixture = TestBed.createComponent(NewUserComponent);
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

  describe('When calling fileBrowseHandler', () => {
    it('Should call on the api and dispatch an update action', () => {
      spyOn(component.user, 'update').and.returnValue(of(mockUser));
      spyOn(component.store, 'dispatch');
      spyOn(component.storage, 'upload').and.resolveTo(
        new Promise(() => {
          const ref = {
            getDownloadURL: new Promise(() => {
              'url';
            }),
          };
        }) as any
      );
      component.imageToUpload = 'url';
      component.fileBrowseHandler({
        files: [new File(['this is a test'], 'test')],
      });
      expect(component.storage.upload).toHaveBeenCalled();
    });
  });

  describe('When calling component.handleSubmit without filling in al fields', () => {
    it('Should show an alert', () => {
      spyOn(component.user, 'create').and.returnValue(of(mockUser));
      component.handleSubmit();
      expect(component.user.create).not.toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.handleSubmit wothour having uploaded an image', () => {
    it('Should call the service that uploads the data to the api', () => {
      spyOn(component.user, 'create').and.returnValue(of(mockUser));
      component.newUserForm.controls['userName'].setValue('Test');
      component.newUserForm.controls['name'].setValue('Test');
      component.newUserForm.controls['password'].setValue('12345');
      component.newUserForm.controls['mail'].setValue('test@test.test');
      component.handleSubmit();
      expect(component.imageToUpload).toBe(
        'https://firebasestorage.googleapis.com/v0/b/final-isdi-coders.appspot.com/o/UserImages%2Fdef-user.png?alt=media&token=8d581c44-e983-4a54-a78d-39adef2ab5d9'
      );
      expect(component.user.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.handleSubmit having uploaded an image', () => {
    it('Should call the service that uploads the data to the api', () => {
      spyOn(component.user, 'create').and.returnValue(of(mockUser));
      component.newUserForm.controls['userName'].setValue('Test');
      component.newUserForm.controls['name'].setValue('Test');
      component.newUserForm.controls['password'].setValue('12345');
      component.newUserForm.controls['mail'].setValue('test@test.test');
      component.imageToUpload = 'url';
      component.handleSubmit();
      expect(component.user.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.handleSubmit having uploaded an image but having apo problems', () => {
    it('Should call the service that uploads the data to the api', () => {
      spyOn(component.user, 'create').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      component.newUserForm.controls['userName'].setValue('Test');
      component.newUserForm.controls['name'].setValue('Test');
      component.newUserForm.controls['password'].setValue('12345');
      component.newUserForm.controls['mail'].setValue('test@test.test');
      component.imageToUpload = 'url';
      component.handleSubmit();
      expect(component.user.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
      initialState = {
        ...mockInitialState,
        user: { ...mockInitialState.user, admin: false },
      };
    });
  });

  describe('When trying to navigate without being an admin', () => {
    it('Should call router.navigate to the dashboard', () => {
      const fixture = TestBed.createComponent(NewUserComponent);
      const component = fixture.componentInstance;
      spyOn(component.router, 'navigate');
      fixture.detectChanges();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
