import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStore } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(token: string, user: Partial<UserStore>) {
    return this.http.post(environment.backUrl + 'users/new', user, {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<UserStore>;
  }

  update(token: string, user: Partial<UserStore>, id: string) {
    return this.http.patch(environment.backUrl + `users/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
