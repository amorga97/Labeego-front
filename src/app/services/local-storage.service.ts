import { Injectable } from '@angular/core';
import { UserStore } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getDataFromLocalStorage(): string | null {
    if (localStorage.getItem('user-token')) {
      return JSON.parse(localStorage.getItem('user-token') as string);
    }
    return null;
  }

  saveDataToLocalStorage(data: UserStore) {
    if (!localStorage.getItem('user-token')) {
      localStorage.setItem('user-token', JSON.stringify(data));
    } else return this.getDataFromLocalStorage();
  }

  clearLocalStorage() {
    localStorage.removeItem('user-token');
  }
}
