import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockProject } from '../mocks/mocks';

import { ProjectsService } from './projects.service';

fdescribe('ProjectsService', () => {
  let service: ProjectsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.getAllProjects', () => {
    it('Should call httpClient', () => {
      service.getAllProjects('token').subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify([mockProject]));
      });

      const req = httpTestingController.expectOne({
        url: 'http://localhost:4600/projects',
        method: 'GET',
      });

      expect(req.request.url).toBe('http://localhost:4600/projects');

      req.flush([mockProject]);
    });
  });

  describe('When calling service.getOne', () => {
    it('Should call httpClient', () => {
      service.getOne('token', 'id').subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockProject));
      });

      const req2 = httpTestingController.expectOne({
        url: 'http://localhost:4600/projects/id',
        method: 'GET',
      });

      expect(req2.request.url).toBe('http://localhost:4600/projects/id');

      req2.flush(mockProject);
    });
  });

  describe('When calling service.update', () => {
    it('Should call httpClient', () => {
      service.update('token', 'id', mockProject).subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockProject));
      });

      const req3 = httpTestingController.expectOne({
        url: 'http://localhost:4600/projects/id',
        method: 'PATCH',
      });

      expect(req3.request.url).toBe('http://localhost:4600/projects/id');

      req3.flush(mockProject);
    });
  });

  describe('When calling service.update', () => {
    it('Should call httpClient', () => {
      service.remove('token', 'id').subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockProject));
      });

      const req4 = httpTestingController.expectOne({
        url: 'http://localhost:4600/projects/id',
        method: 'DELETE',
      });

      expect(req4.request.url).toBe('http://localhost:4600/projects/id');

      req4.flush(mockProject);
    });
  });

  describe('When calling service.create', () => {
    it('Should call httpClient', () => {
      service.create('token', mockProject).subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify([mockProject]));
      });

      const req5 = httpTestingController.expectOne({
        url: 'http://localhost:4600/projects/new',
        method: 'POST',
      });

      expect(req5.request.url).toBe('http://localhost:4600/projects/new');

      req5.flush([mockProject]);
    });
  });

  describe('When calling service.removeAppointment', () => {
    it('Should call httpClient', () => {
      service.removeAppointment('token', 'id').subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify([mockProject]));
      });

      const req6 = httpTestingController.expectOne({
        url: 'http://localhost:4600/projects/id/appointment',
        method: 'DELETE',
      });

      expect(req6.request.url).toBe(
        'http://localhost:4600/projects/id/appointment'
      );

      req6.flush([mockProject]);
    });
  });
});
