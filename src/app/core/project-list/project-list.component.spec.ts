import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { mockProject } from 'src/app/mocks/mocks';

import { ProjectListComponent } from './project-list.component';

const projWithtoutAppointment = { ...mockProject };
delete projWithtoutAppointment.appointment;

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  describe('When instanciating the component', () => {
    it('Should call on the api to get the projects', () => {
      const fixture = TestBed.createComponent(ProjectListComponent);
      const component = fixture.componentInstance;
      const date = new Date();
      spyOn(component.projectsService, 'getAllProjects').and.returnValue(
        of([mockProject, projWithtoutAppointment])
      );
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      fixture.detectChanges();
      expect(component.projects).toEqual([
        mockProject,
        projWithtoutAppointment,
      ]);
      expect(component.projectsWithAppointment.length).toBe(1);
      expect(component.projectsWithoutAppointment.length).toBe(1);
    });
  });

  describe('When instanciating the component with api problems', () => {
    it('Should handle the error', () => {
      const fixture = TestBed.createComponent(ProjectListComponent);
      const component = fixture.componentInstance;
      const date = new Date();
      spyOn(component.projectsService, 'getAllProjects').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      fixture.detectChanges();
      expect(component.projects).toBeUndefined();
    });
  });

  describe('When calling component.handleClick', () => {
    it('Should navigate to the given project', () => {
      const fixture = TestBed.createComponent(ProjectListComponent);
      const component = fixture.componentInstance;
      const date = new Date();
      spyOn(component.projectsService, 'getAllProjects').and.returnValue(
        of([mockProject, projWithtoutAppointment])
      );
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      fixture.detectChanges();
      spyOn(component.router, 'navigate');
      component.handleClick(mockProject);
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
