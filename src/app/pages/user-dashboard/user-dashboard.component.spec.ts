import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { mockGetAllProjectsResponse, mockUser } from 'src/app/mocks/mocks';
import { initialState } from 'src/app/store/user.reducer';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let mockObj: jasmine.SpyObj<{}>;

  beforeEach(async () => {
    let initialState = {
      id: '4f4f4f4f4f4f4f4',
      teamLeader: 'test',
      userName: 'test',
      name: 'test',
      admin: false,
      mail: 'test',
      token: '8k8k8k8k8k8',
    };
    await TestBed.configureTestingModule({
      declarations: [
        UserDashboardComponent,
        ProjectCardComponent,
        NewProjectComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'user-dash', component: UserDashboardComponent },
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
      spyOn(
        fixture.componentInstance.localStorage,
        'getDataFromLocalStorage'
      ).and.returnValue('token');
      spyOn(
        fixture.componentInstance.projectsServ,
        'getAllProjects'
      ).and.returnValue(mockGetAllProjectsResponse);
      fixture.detectChanges();
      expect(
        fixture.componentInstance.projectsServ.getAllProjects
      ).toHaveBeenCalled();
    });
  });

  describe('When instanciating UserDashboardComponent with an expired token', () => {
    it('Should call router.navigate', () => {
      const fixture = TestBed.createComponent(UserDashboardComponent);

      spyOn(
        fixture.componentInstance.localStorage,
        'getDataFromLocalStorage'
      ).and.returnValue('token');

      spyOn(
        fixture.componentInstance.projectsServ,
        'getAllProjects'
      ).and.returnValue(
        new Observable(() => {
          throw new Error('test error');
        })
      );

      spyOn(fixture.componentInstance.router, 'navigate').and.resolveTo();
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
      expect(
        fixture.componentInstance.projectsServ.getAllProjects
      ).toHaveBeenCalled();

      jasmine.clock().tick(2500);

      expect(fixture.componentInstance.router.navigate).toHaveBeenCalled();
    });
  });
});
