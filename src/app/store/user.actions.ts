import { createAction, props } from '@ngrx/store';
import { UserStore } from '../interfaces/interfaces';

export const login = createAction(
  '[User] Login',
  props<{ userData: UserStore }>()
);
export const logout = createAction('[User] Logout');
