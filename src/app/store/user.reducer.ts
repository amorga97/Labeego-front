import { createReducer, on, State } from '@ngrx/store';
import { UserStore } from '../interfaces/interfaces';
import { LocalStorageService } from '../services/local-storage.service';
import * as user from './user.actions';

export const initialState = {
  id: '',
  teamLeader: '',
  userName: '',
  name: '',
  admin: true,
  mail: '',
  token: '',
};

export const UserReducer = createReducer(
  initialState,
  on(user.saveUser, (state: UserStore, { userData }) => {
    return { ...state, ...userData };
  }),
  on(user.logout, (state: UserStore) => {
    LocalStorageService.prototype.clearLocalStorage();
    return initialState;
  })
);
