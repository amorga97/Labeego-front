import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { mockClient, mockInitialState, mockProject } from 'src/app/mocks/mocks';

import { NewProjectFormComponent } from './new-project.component';

describe('NewProjectFormComponent', () => {
  let component: NewProjectFormComponent;
  let fixture: ComponentFixture<NewProjectFormComponent>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectFormComponent);
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

  describe('When instanciating the component', () => {
    it('Should fetch the clients from the api', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();

      expect(component.clientService.getAllClients).toHaveBeenCalled();
    });
  });

  describe('When submitting with valid params', () => {
    it('Should call the api to create the project', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();
      spyOn(component.projects, 'create').and.returnValue(of(mockProject));
      component.newProjectForm.controls['title'].setValue('test project');
      component.newProjectForm.controls['description'].setValue(
        'this is the description of a test project'
      );
      spyOn(component.router, 'navigate');
      component.handleSelect(mockClient);
      component.handleProjectSubmit();
      expect(component.projects.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeFalse();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When submitting with invalid params', () => {
    it('Should call the api to create the project', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();
      spyOn(component.projects, 'create').and.returnValue(of(mockProject));
      component.newProjectForm.controls['title'].setValue('');
      component.newProjectForm.controls['description'].setValue('');
      component.handleSelect(mockClient);
      component.handleProjectSubmit();
      expect(component.projects.create).not.toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When submitting with valid params but having api problems', () => {
    it('Should call the api to create the project', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();
      spyOn(component.projects, 'create').and.returnValue(
        new Observable(() => {
          throw new Error('Test');
        })
      );
      component.newProjectForm.controls['title'].setValue('test project');
      component.newProjectForm.controls['description'].setValue(
        'this is the description of a test project'
      );
      component.handleSelect(mockClient);
      component.handleProjectSubmit();
      expect(component.projects.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When creating a new client with valid params', () => {
    it('Should call the api to create the client', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();
      spyOn(component.clientService, 'create').and.returnValue(of(mockClient));
      component.newClientForm.controls['name'].setValue('Test');
      component.newClientForm.controls['street'].setValue('Test street');
      component.newClientForm.controls['number'].setValue(22);
      component.newClientForm.controls['email'].setValue('test@test.tst');
      component.handleClientSubmit();
      expect(component.clientService.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeFalse();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When creating a new client with invalid params', () => {
    it('Should display an alert', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();
      spyOn(component.clientService, 'create').and.returnValue(of(mockClient));
      component.newClientForm.controls['name'].setValue('');
      component.newClientForm.controls['street'].setValue('');
      component.newClientForm.controls['number'].setValue('');
      component.newClientForm.controls['email'].setValue('');
      component.handleClientSubmit();

      expect(component.clientService.create).not.toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });

  describe('When creating a new client with valid params but having api problems', () => {
    it('Should display an alert', () => {
      const fixture = TestBed.createComponent(NewProjectFormComponent);
      const component = fixture.componentInstance;
      spyOn(component.clientService, 'getAllClients').and.returnValue(
        of([mockClient])
      );
      fixture.detectChanges();
      spyOn(component.clientService, 'create').and.returnValue(
        new Observable(() => {
          throw new Error('Test');
        })
      );
      component.newClientForm.controls['name'].setValue('Test');
      component.newClientForm.controls['street'].setValue('Test street');
      component.newClientForm.controls['number'].setValue(22);
      component.newClientForm.controls['email'].setValue('test@test.tst');
      component.handleClientSubmit();
      expect(component.clientService.create).toHaveBeenCalled();
      expect(component.alertIsActive).toBeTrue();
      expect(component.alertIsError).toBeTrue();

      jasmine.clock().tick(2500);

      expect(component.alertIsActive).toBeFalse();
    });
  });
});
