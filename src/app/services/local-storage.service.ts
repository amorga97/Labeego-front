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

  saveDataToLocalStorage(data: string) {
    if (!localStorage.getItem('user-token')) {
      return localStorage.setItem('user-token', JSON.stringify(data));
    } else return this.getDataFromLocalStorage();
  }

  clearLocalStorage() {
    localStorage.removeItem('user-token');
  }
}
