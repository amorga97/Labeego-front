import { createAction, props } from '@ngrx/store';
import { UserStore } from '../interfaces/interfaces';

export const saveUser = createAction(
  '[User] Save user',
  props<{ userData: UserStore }>()
);
export const logout = createAction('[User] Logout');
