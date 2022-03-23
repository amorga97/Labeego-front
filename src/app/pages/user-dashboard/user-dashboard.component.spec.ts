import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { ifProject } from 'src/app/interfaces/interfaces';
import { mockGetAllProjectsResponse } from 'src/app/mocks/mocks';
import { ProjectsService } from 'src/app/services/projects.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { UserDashboardRoutingModule } from './user-dashboar-routing.module';

import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let projectServ: ProjectsService;
  const mockService = {
    getAllProjects: jasmine.createSpy('getAllProjects'),
  };
  mockService.getAllProjects.and.returnValue(of(mockGetAllProjectsResponse));

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
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ProjectsService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    projectServ = TestBed.inject(ProjectsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When instanciating UserDashboardComponent', () => {
    it('Should call projectServ.getAllProjects', () => {
      expect(component).toBeTruthy();
      // expect(component.projectsServ.getAllProjects).toHaveBeenCalled();
    });
  });
});
