import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.getDataFromLocalStorage', () => {
    it('Should call localStorage.getItem', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('token'));

      service.getDataFromLocalStorage();
      expect(localStorage.getItem).toHaveBeenCalled;
    });
  });
  describe('When calling service.getDataFromLocalStorage', () => {
    it('Should call localStorage.getItem', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      service.getDataFromLocalStorage();
      expect(localStorage.getItem).toHaveBeenCalled;
    });
  });

  describe('When calling service.saveDataToLocalStorage and there already is a token', () => {
    it('Should call localStorage.setItem', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('token'));
      spyOn(localStorage, 'setItem');

      service.saveDataToLocalStorage('token');
      expect(localStorage.getItem).toHaveBeenCalled;
      expect(localStorage.setItem).not.toHaveBeenCalled;
    });
  });

  describe('When calling service.saveDataToLocalStorage and no token is saved yet', () => {
    it('Should call localStorage.setItem', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(localStorage, 'setItem');

      service.saveDataToLocalStorage('token');
      expect(localStorage.getItem).toHaveBeenCalled;
      expect(localStorage.setItem).toHaveBeenCalled;
    });
  });

  describe('When calling service.saveDataToLocalStorage and no token is saved yet', () => {
    it('Should call localStorage.setItem', () => {
      spyOn(localStorage, 'removeItem');

      service.clearLocalStorage();
      expect(localStorage.removeItem).toHaveBeenCalled;
    });
  });
});
