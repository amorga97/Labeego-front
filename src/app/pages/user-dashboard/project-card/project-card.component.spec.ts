import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockInitialState, mockProject, mockTask } from 'src/app/mocks/mocks';

import { ProjectCardComponent } from './project-card.component';

const generateDate = (hoursAgo: number, daysAgo: number) => {
  const currentDateArray = new Date().toUTCString().split(' ');
  const time = currentDateArray[4].split(':');
  currentDateArray[1] = (+currentDateArray[1] - daysAgo).toString();
  time[0] = (+time[0] - hoursAgo).toString();
  currentDateArray[4] = time.join(':');
  return new Date(currentDateArray.join(' '));
};

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCardComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.index = 1;
    component.project = mockProject;
    component.hasAppointment = false;
    const document = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('When instanciating the component as an admin, with half the tasks done', () => {
    it('Should display the pictures of the projects creators', () => {
      expect(component.admin).toBeTrue();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(3);
      expect(document.querySelector('.project-card__user-image')).toBeDefined();
      initialState = {
        ...mockInitialState,
        user: { ...mockInitialState.user, admin: false },
      };
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update less than 1 hour ago', () => {
    it('Should display the pictures of the projects creators', () => {
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(3);
      expect(component.lastUpdate).toBe('Hace menos de 1 hora');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update 1 hour ago', () => {
    it('Should display the pictures of the projects creators', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      component.project = { ...mockProject, lastUpdate: generateDate(1, 0) };
      fixture.detectChanges();
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(3);
      expect(component.lastUpdate).toBe('Hace 1 hora');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update 3 hours ago', () => {
    it('Should display the pictures of the projects creators', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      const document = fixture.nativeElement as HTMLElement;
      component.project = { ...mockProject, lastUpdate: generateDate(3, 0) };
      fixture.detectChanges();
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(3);
      expect(component.lastUpdate).toBe('Hace 3 horas');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update 1 day ago', () => {
    it('Should display the pictures of the projects creators', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      const document = fixture.nativeElement as HTMLElement;
      component.project = { ...mockProject, lastUpdate: generateDate(0, 1) };
      fixture.detectChanges();
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(3);
      expect(component.lastUpdate).toBe('Hace 1 día');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update 2 days ago', () => {
    it('Should display the pictures of the projects creators', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      const document = fixture.nativeElement as HTMLElement;
      component.project = { ...mockProject, lastUpdate: generateDate(0, 2) };
      fixture.detectChanges();
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(3);
      expect(component.lastUpdate).toBe('Hace 2 días');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update 2 days ago, and an appointment and less than 3 tasks in review', () => {
    it('Should display the pictures of the projects creators', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      component.hasAppointment = true;
      const document = fixture.nativeElement as HTMLElement;
      component.project = {
        ...mockProject,
        lastUpdate: generateDate(0, 2),
        appointment: [new Date().toString()],
      };
      fixture.detectChanges();
      console.log(component.hasAppointment);
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(50);
      expect(component.tasks.length).toBe(0);
      expect(component.lastUpdate).toBe('Hace 2 días');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When instanciating the component as a regular user, with half the tasks done, and last update 2 days ago, and an appointment and more than 3 tasks in review', () => {
    it('Should display the pictures of the projects creators', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      component.hasAppointment = true;
      const document = fixture.nativeElement as HTMLElement;
      component.project = {
        ...mockProject,
        lastUpdate: generateDate(0, 2),
        appointment: [new Date().toString()],
        toReview: [mockTask, mockTask, mockTask, mockTask],
      };
      fixture.detectChanges();
      console.log(component.hasAppointment);
      expect(component.admin).toBeFalse();
      expect(component.progress).toBe(25);
      expect(component.tasks.length).toBe(3);
      expect(component.lastUpdate).toBe('Hace 2 días');
      expect(document.querySelector('.project-card__user-image')).toBeNull();
    });
  });

  describe('When clicking on the card', () => {
    it('Should call router.navigate', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      const document = fixture.nativeElement as HTMLElement;
      component.project = { ...mockProject, lastUpdate: generateDate(0, 2) };
      fixture.detectChanges();
      spyOn(component.router, 'navigate');
      component.handleClick();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('When clicking on the card', () => {
    it('Should call router.navigate', () => {
      const fixture = TestBed.createComponent(ProjectCardComponent);
      const component = fixture.componentInstance;
      component.index = 1;
      const document = fixture.nativeElement as HTMLElement;
      component.project = { ...mockProject, lastUpdate: generateDate(0, 2) };
      fixture.detectChanges();
      spyOn(component.router, 'navigate');
      component.handleClick();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
