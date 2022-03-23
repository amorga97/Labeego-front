import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ifClient, ifNewClient } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getAllClients(token: string) {
    return this.http.get(environment.backUrl + 'clients', {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifClient[]>;
  }

  create(token: string, client: ifNewClient) {
    return this.http.post(environment.backUrl + 'clients/new', client, {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifClient>;
  }
}
