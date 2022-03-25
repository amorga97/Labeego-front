import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockClient } from '../mocks/mocks';

import { ClientsService } from './clients.service';

const mockGetAllResponse = [mockClient];

describe('ClientsService', () => {
  let service: ClientsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.getAllClients', () => {
    it('Should call httpClient', () => {
      service.getAllClients('token').subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockGetAllResponse));
      });

      const req = httpTestingController.expectOne({
        url: 'http://localhost:4600/clients',
        method: 'GET',
      });

      expect(req.request.url).toBe('http://localhost:4600/clients');

      req.flush(mockGetAllResponse);
    });
  });

  describe('When calling service.create', () => {
    it('Should call httpClient', () => {
      service.create('token', mockClient).subscribe((res: any) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toBe(JSON.stringify(mockClient));
      });

      const req2 = httpTestingController.expectOne({
        url: 'http://localhost:4600/clients/new',
        method: 'POST',
      });

      expect(req2.request.url).toBe('http://localhost:4600/clients/new');

      req2.flush(mockClient);
    });
  });
});
