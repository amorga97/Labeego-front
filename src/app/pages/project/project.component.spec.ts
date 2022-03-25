import {
  DragDropModule,
  CdkDragRelease,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { ifTask } from 'src/app/interfaces/interfaces';
import { mockInitialState, mockProject, mockTask } from 'src/app/mocks/mocks';

import { ProjectComponent } from './project.component';

fdescribe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'project/:id', component: ProjectComponent },
        ]),
        HttpClientTestingModule,
        ReactiveFormsModule,
        DragDropModule,
        CoreModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
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

  describe('When instanciating the component with an invalid id', () => {
    it('Should show an alert', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(
        new Observable(() => {
          throw new Error('Test');
        })
      );
      spyOn(component.router, 'navigate').and.returnValue(
        new Promise(() => true)
      );
      fixture.detectChanges();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);
      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When instanciating the component with a valid id', () => {
    it('Should display the title and description of the project', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      expect(component.projectForm.get('title')?.value).toBe('test');
      expect(component.projectForm.get('description')?.value).toBe(
        'test description'
      );
    });
  });

  describe('When dropping a task on the same column', () => {
    it('Should call on the api to update the data', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.projects, 'update').and.returnValue(of(mockProject));
      const container = { data: ['data', 'data'] };
      component.drop({
        container: container,
        previousIndex: 0,
        currentIndex: 1,
        previousContainer: container,
      } as unknown as CdkDragDrop<ifTask[]>);
      expect(component.projects.update).toHaveBeenCalledWith(
        '8k8k8k8k8k8',
        '12345',
        { ...component.project }
      );
    });
  });

  describe('When reordering the tasks in the done column', () => {
    it('Should call on the api to update the data', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.projects, 'update').and.returnValue(of(mockProject));
      spyOn(component.task, 'changeStatus').and.returnValue(of(mockTask));
      component.drop({
        currentIndex: 1,
        container: {
          data: [{ container: 3 }, { _id: 1 }],
          id: 'cdk-drop-list-3',
        },
        previousIndex: 0,
        previousContainer: {
          data: [{ container: 1 }, { _id: 1 }],
          id: 'cdk-drop-list-1',
        },
      } as unknown as CdkDragDrop<ifTask[]>);
      expect(component.projects.update).toHaveBeenCalledWith(
        '8k8k8k8k8k8',
        '12345',
        { ...component.project }
      );
      expect(component.task.changeStatus).toHaveBeenCalled();

      component.drop({
        currentIndex: 1,
        container: {
          data: [{ container: 3 }, { _id: 1 }],
          id: 'cdk-drop-list-2',
        },
        previousIndex: 0,
        previousContainer: {
          data: [{ container: 1 }, { _id: 1 }],
          id: 'cdk-drop-list-1',
        },
      } as unknown as CdkDragDrop<ifTask[]>);

      component.drop({
        currentIndex: 1,
        container: {
          data: [{ container: 3 }, { _id: 1 }],
          id: 'cdk-drop-list-1',
        },
        previousIndex: 0,
        previousContainer: {
          data: [{ container: 1 }, { _id: 1 }],
          id: 'cdk-drop-list-1',
        },
      } as unknown as CdkDragDrop<ifTask[]>);
      component.drop({
        currentIndex: 1,
        container: {
          data: [{ container: 3 }, { _id: 1 }],
          id: 'cdk-drop-list-0',
        },
        previousIndex: 0,
        previousContainer: {
          data: [{ container: 1 }, { _id: 1 }],
          id: 'cdk-drop-list-1',
        },
      } as unknown as CdkDragDrop<ifTask[]>);
      component.drop({
        currentIndex: 1,
        container: {
          data: [{ container: 3 }, { _id: 1 }],
          id: 'test',
        },
        previousIndex: 0,
        previousContainer: {
          data: [{ container: 1 }, { _id: 1 }],
          id: 'cdk-drop-list-1',
        },
      } as unknown as CdkDragDrop<ifTask[]>);
    });
  });

  describe('When succesfully deleting the project', () => {
    it('Should call on the api to delete the project', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.projects, 'remove').and.returnValue(of(mockProject));
      component.handleDelete();
      spyOn(component.router, 'navigate');
      expect(component.projects.remove).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeFalse();

      jasmine.clock().tick(2500);
      expect(component.alertIsActive).toBeFalse();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('When failing to delete the project', () => {
    it('Should call on the api to delete the project', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.projects, 'remove').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      component.handleDelete();
      spyOn(component.router, 'navigate');
      expect(component.projects.remove).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);
      expect(component.alertIsActive).toBeFalse();
      expect(component.router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('When succesfully updating the project', () => {
    it('Should call on the api to delete the project', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.projects, 'update').and.returnValue(of(mockProject));
      component.handleSubmit();
      expect(component.projects.update).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeFalse();

      jasmine.clock().tick(2500);
      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When failing to update the project', () => {
    it('Should call on the api to delete the project', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.projects, 'update').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      component.handleSubmit();
      expect(component.projects.update).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);
      expect(component.alertIsActive).toBeFalse();
    });
  });
});
