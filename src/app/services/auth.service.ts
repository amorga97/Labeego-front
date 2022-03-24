import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStore } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.backUrl;
  }

  registerUser(userData: UserStore) {
    return this.http.post(
      this.url + 'register',
      userData
    ) as Observable<UserStore>;
  }

  loginUser(
    token?: string,
    loginData?: { userName: string; password: string }
  ) {
    if (token) {
      return this.http.post(
        this.url + 'login',
        { hasToken: true },
        { headers: { Authorization: `Bearer ${token}` } }
      ) as Observable<UserStore>;
    }
    return this.http.post(this.url + 'login', {
      ...loginData,
      hasToken: false,
    }) as Observable<UserStore>;
  }
}
