import { DOCUMENT } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from 'src/app/login-register/login/login.component';
import { RegisterComponent } from 'src/app/login-register/register/register.component';
import { LandingComponent } from './landing.component';

const mockPath = {
  style: { strokeDasharray: {} },
  getTotalLength: () => {
    10;
  },
};

const mockLenght = 10;

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  const mockDocument = jasmine.createSpyObj('Document', ['querySelector']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent, LoginComponent, RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  describe('When instanciating the component', () => {
    it('Should run the functions to initialize animations', () => {
      const fixture = TestBed.createComponent(LandingComponent);
      const document = fixture.nativeElement as HTMLElement;
      const component = fixture.componentInstance;
      TestBed.inject(DOCUMENT);
      spyOn(component.document, 'querySelector').and.returnValue(document);
      console.log(document);
      fixture.detectChanges();
      component.document.addEventListener('DOMContentLoaded', () => {
        expect(document.querySelector('.header')).toBeDefined();
      });
      component.configureScrollEffect();
      component.queryDocument(mockPath, mockPath);
    });
  });
});
