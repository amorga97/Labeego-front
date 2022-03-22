import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ifProject } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAllProjects(token: string) {
    return this.http.get(environment.backUrl + 'projects', {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifProject[]>;
  }
}
