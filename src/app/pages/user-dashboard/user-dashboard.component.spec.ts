import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { ifProject } from 'src/app/interfaces/interfaces';
import {
  mockGetAllProjectsResponse,
  mockInitialState,
  mockProject,
  mockUser,
} from 'src/app/mocks/mocks';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { UserDashboardComponent } from './user-dashboard.component';

const projWithtoutAppointment = { ...mockProject };
projWithtoutAppointment.appointment = [];

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let mockObj: jasmine.SpyObj<{}>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserDashboardComponent,
        ProjectCardComponent,
        NewProjectComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: UserDashboardComponent },
        ]),
        HttpClientTestingModule,
        CoreModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    jasmine.clock().install();
    mockObj = jasmine.createSpyObj('getDataMock', ['subscribe']);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  describe('When instanciating UserDashboardComponent with a valid token', () => {
    it('Should call projectServ.getAllProjects', () => {
      const fixture = TestBed.createComponent(UserDashboardComponent);
      const component = fixture.componentInstance;
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.projectsServ, 'getAllProjects').and.returnValue(
        mockGetAllProjectsResponse
      );
      fixture.detectChanges();
      expect(component.projectsServ.getAllProjects).toHaveBeenCalled();
    });
  });

  describe('When instanciating UserDashboardComponent with a valid token', () => {
    it('Should call projectServ.getAllProjects', () => {
      const fixture = TestBed.createComponent(UserDashboardComponent);
      const component = fixture.componentInstance;
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.projectsServ, 'getAllProjects').and.returnValue(
        of([mockProject, projWithtoutAppointment])
      );
      fixture.detectChanges();
      expect(component.projectsServ.getAllProjects).toHaveBeenCalled();
    });
  });

  describe('When instanciating UserDashboardComponent with an expired token', () => {
    it('Should call router.navigate', () => {
      const fixture = TestBed.createComponent(UserDashboardComponent);
      const component = fixture.componentInstance;

      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );

      spyOn(component.projectsServ, 'getAllProjects').and.returnValue(
        new Observable(() => {
          throw new Error('test error');
        })
      );
      spyOn(component.router, 'navigate').and.resolveTo();
      fixture.detectChanges();
      expect(component.projectsServ.getAllProjects).toHaveBeenCalled();

      jasmine.clock().tick(2500);

      expect(fixture.componentInstance.router.navigate).toHaveBeenCalled();
    });
  });
});
