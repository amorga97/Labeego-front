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
import {
  mockClient,
  mockInitialState,
  mockProject,
  mockTask,
} from 'src/app/mocks/mocks';
import { InjectionToken } from '@angular/core';
import { ProjectComponent } from './project.component';

let mockAddedTask = { ...mockTask };

const WINDOW = new InjectionToken('Window');

const windowMock = {
  location: {
    reload: jasmine.createSpy('reload'),
  },
};

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'project/:id', component: ProjectComponent },
          { path: 'dashboard', component: ProjectComponent },
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
      spyOn(component.clients, 'getOne').and.returnValue(of(mockClient));
      fixture.detectChanges();
      expect(component.clients.getOne).toHaveBeenCalled();
      expect(component.projectForm.get('title')?.value).toBe('test');
      expect(component.projectForm.get('description')?.value).toBe(
        'test description'
      );
    });
  });

  describe('When instanciating the component with a valid id, but client does not exist', () => {
    it('Should display the title and description of the project', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.router, 'navigate');
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      spyOn(component.clients, 'getOne').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      fixture.detectChanges();
      expect(component.clients.getOne).toHaveBeenCalled();
      expect(component.projectForm.get('title')?.value).toBe('test');
      expect(component.projectForm.get('description')?.value).toBe(
        'test description'
      );
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
      expect(component.router.navigate).toHaveBeenCalled();
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

  describe('When calling component.toggleNewTask', () => {
    it('Should call document.getelementbyid', () => {
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
      component.toggleNewTask('newToDo');
    });
  });

  describe('When calling component.toggleDate', () => {
    it('Should update the state of component.dateActive to true', () => {
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
      component.toggleDate();
      expect(component.dateActive).toBeTrue();
    });
  });

  describe('When calling component.createNewTask', () => {
    it('Should call document.getelementbyid', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      const spy = spyOn(component.task, 'create').and.returnValue(
        of(mockAddedTask)
      );

      component.project = mockProject;
      component.createNewTask('testing', 'newToDo');
      expect(component.task.create).toHaveBeenCalled();

      mockAddedTask = { ...mockTask, status: 'doing' };
      spy.and.returnValue(of(mockAddedTask));
      component.createNewTask('testing', 'newDoing');
      expect(component.task.create).toHaveBeenCalled();

      mockAddedTask = { ...mockTask, status: 'to-review' };
      spy.and.returnValue(of(mockAddedTask));
      component.createNewTask('testing', 'newToReview');
      expect(component.task.create).toHaveBeenCalled();

      mockAddedTask = { ...mockTask, status: 'to-do' };
      spy.and.returnValue(of(mockAddedTask));
      component.createNewTask('testing', 'newDone');
      expect(component.task.create).toHaveBeenCalled();
    });
  });

  describe('When calling component.removeTask', () => {
    it('Should call document.task.remove', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      const spy = spyOn(component.task, 'remove').and.returnValue(
        of(mockAddedTask)
      );
      component.doing.push(mockTask);
      component.done.push(mockTask);
      component.toDo.push(mockTask);
      component.toReview.push(mockTask);

      component.removeTask('id');

      mockAddedTask = { ...mockTask, status: 'to-review' };
      spy.and.returnValue(of(mockAddedTask));
      component.removeTask('id');

      mockAddedTask = { ...mockTask, status: 'doing' };
      spy.and.returnValue(of(mockAddedTask));
      component.removeTask('id');

      mockAddedTask = { ...mockTask, status: 'done' };
      spy.and.returnValue(of(mockAddedTask));
      component.removeTask('id');

      mockAddedTask = { ...mockTask, status: 'to-review' };
      spy.and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      component.removeTask('id');
    });
  });

  describe('When calling component.handleClientUpdate', () => {
    it('Should call component.clients.update', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.clients, 'update').and.returnValue(of(mockClient));
      const spy = spyOn(component.task, 'remove').and.returnValue(
        of(mockAddedTask)
      );

      component.clientForm.controls['name']?.setValue('testing');
      component.clientForm.controls['phone']?.setValue('123123123');
      component.clientForm.controls['email']?.setValue('testing');
      component.clientForm.controls['street']?.setValue('testing');
      component.clientForm.controls['number']?.setValue(22);

      component.client = mockClient;
      component.handleClientUpdate();

      expect(component.clients.update).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.handleClientUpdate and having api problems', () => {
    it('Should call component.clients.update and show an alert', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.clients, 'update').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );
      const spy = spyOn(component.task, 'remove').and.returnValue(
        of(mockAddedTask)
      );

      component.clientForm.controls['name']?.setValue('testing');
      component.clientForm.controls['phone']?.setValue('123123123');
      component.clientForm.controls['email']?.setValue('testing');
      component.clientForm.controls['street']?.setValue('testing');
      component.clientForm.controls['number']?.setValue(22);

      component.client = mockClient;
      component.handleClientUpdate();

      expect(component.clients.update).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.createAppointment', () => {
    it('Should call component.projects.update', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.projects, 'update').and.returnValue(of(mockProject));

      component.createAppointment();

      expect(component.projects.update).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.createAppointment and having api problems', () => {
    it('Should call component.projects.update and show an error alert', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.projects, 'update').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );

      component.createAppointment();

      expect(component.projects.update).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.deleteAppointment', () => {
    it('Should call component.projects.update', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.projects, 'removeAppointment').and.returnValue(
        of(mockProject)
      );

      component.deleteAppointment();

      expect(component.projects.removeAppointment).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When calling component.deleteAppointment and having api problems', () => {
    it('Should call component.projects.update and show an error alert', () => {
      const fixture = TestBed.createComponent(ProjectComponent);
      const component = fixture.componentInstance;
      const document = fixture.nativeElement as HTMLElement;
      spyOn(component.projects, 'getOne').and.returnValue(of(mockProject));
      fixture.detectChanges();
      spyOn(component.localStorage, 'getDataFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.projects, 'removeAppointment').and.returnValue(
        new Observable(() => {
          throw new Error('test');
        })
      );

      component.deleteAppointment();

      expect(component.projects.removeAppointment).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });
});
