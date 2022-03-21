import { createReducer, on, State } from '@ngrx/store';
import { InitialState } from '@ngrx/store/src/models';
import { OnReducer } from '@ngrx/store/src/reducer_creator';
import { UserStore } from '../interfaces/interfaces';
import * as user from './user.actions';

export const initialState = {
  userName: '',
  name: '',
  userImage: '',
  admin: false,
  mail: '',
};

const _userReducer = createReducer(
  initialState,
  on(user.login, (state: UserStore, { userData }) => {
    return { ...state, ...userData };
  })
);
