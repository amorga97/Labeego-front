import { createReducer, on, State } from '@ngrx/store';
import { UserStore } from '../interfaces/interfaces';
import { LocalStorageService } from '../services/local-storage.service';
import * as user from './user.actions';

export const initialState = {
  id: '',
  teamLeader: '',
  userName: '',
  name: '',
  admin: false,
  mail: '',
  token: '',
};

export const UserReducer = createReducer(
  initialState,
  on(user.saveUser, (state: UserStore, { userData }) => {
    const storedData =
      LocalStorageService.prototype.saveDataToLocalStorage(userData);
    console.log(
      'data from local storage',
      localStorage.getItem('projectsUser')
    );
    return { ...state, ...storedData };
  })
);
