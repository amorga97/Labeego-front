import { createReducer, on, State } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { OnReducer } from '@ngrx/store/src/reducer_creator';
import { UserStore } from '../interfaces/interfaces';
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
  on(user.login, (state: UserStore, { userData }) => {
    localStorage.setItem('projectsUser', JSON.stringify(userData));
    console.log(
      'data from local storage',
      localStorage.getItem('projectsUser')
    );
    return { ...state, ...userData };
  })
);
