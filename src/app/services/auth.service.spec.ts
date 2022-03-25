import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockUser } from '../mocks/mocks';

import { AuthService } from './auth.service';

const mockResponse = {
  admin: true,
  name: 'test',
  userName: 'test',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.loginUser with a token', () => {
    it('Should fetch the user`s data from the api', () => {
      service.loginUser('token').subscribe((res: any) => {
        expect(res).not.toBe(null);
        expect(JSON.stringify(res)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:4600/login',
      });

      expect(req.request.url).toBe('http://localhost:4600/login');

      req.flush(mockResponse);
    });
  });

  describe('When calling service.loginUser with no token and valid user data', () => {
    it('Should fetch the user`s data from the api', () => {
      service
        .loginUser(undefined, { password: '12345', userName: 'test' })
        .subscribe((res: any) => {
          expect(res).not.toBe(null);
          expect(JSON.stringify(res)).toEqual(JSON.stringify(mockResponse));
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:4600/login',
      });

      expect(req.request.url).toBe('http://localhost:4600/login');

      req.flush(mockResponse);
    });
  });

  describe('When calling service.registerUser', () => {
    it('Should call httpClientService', () => {
      service.registerUser(mockUser).subscribe((res: any) => {
        expect(res).not.toBe(null);
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockResponse));
      });

      const RegisterReq = httpTestingController.expectOne({
        url: 'http://localhost:4600/register',
        method: 'POST',
      });

      expect(RegisterReq.request.url).toBe('http://localhost:4600/register');

      RegisterReq.flush(mockResponse);
    });
  });
});
