import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ifClient } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getAllClients(token: string) {
    return this.http.get(environment.backUrl + 'clients', {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifClient>;
  }
}
