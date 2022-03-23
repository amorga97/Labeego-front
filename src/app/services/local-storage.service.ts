import { Injectable } from '@angular/core';
import { UserStore } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  dataKey: string = 'app-user-info';
  getDataFromLocalStorage() {
    if (localStorage.getItem('app-user-info')) {
      return JSON.parse(localStorage.getItem('app-user-info') as string);
    }
    return null;
  }

  saveDataToLocalStorage(data: UserStore) {
    if (!localStorage.getItem('app-user-info')) {
      localStorage.setItem('app-user-info', JSON.stringify(data));
    } else return this.getDataFromLocalStorage();
  }

  clearLocalStorage() {
    localStorage.removeItem('app-user-info');
  }
}
