import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockUser } from '../mocks/mocks';

import { UserService } from './user.service';

describe('UsersService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.create', () => {
    it('Should call httpClient', () => {
      service.create('token', mockUser).subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockUser));
      });

      const req = httpTestingController.expectOne({
        url: 'http://localhost:4600/users/new',
        method: 'POST',
      });

      expect(req.request.url).toBe('http://localhost:4600/users/new');

      req.flush(mockUser);
    });
  });

  describe('When calling service.create', () => {
    it('Should call httpClient', () => {
      service.update('token', mockUser, 'id').subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockUser));
      });

      const req2 = httpTestingController.expectOne({
        url: 'http://localhost:4600/users/id',
        method: 'PATCH',
      });

      expect(req2.request.url).toBe('http://localhost:4600/users/id');

      req2.flush(mockUser);
    });
  });
});
