import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockTask } from '../mocks/mocks';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TasksService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.changeStatus', () => {
    it('Should call httpClient', () => {
      service
        .changeStatus('token', 'id', 'id', mockTask)
        .subscribe((res: any) => {
          expect(res).not.toBeNull();
          expect(JSON.stringify(res)).toBe(JSON.stringify(mockTask));
        });

      const req = httpTestingController.expectOne({
        url: 'http://localhost:4600/tasks/id/id',
        method: 'PATCH',
      });

      expect(req.request.url).toBe('http://localhost:4600/tasks/id/id');

      req.flush(mockTask);
    });
  });
});
