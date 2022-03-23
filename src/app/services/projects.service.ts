import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ifNewProject, ifProject } from '../interfaces/interfaces';

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

  getOne(token: string, id: string) {
    return this.http.get(environment.backUrl + 'projects' + id, {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifProject>;
  }

  create(token: string, project: ifNewProject) {
    return this.http.post(environment.backUrl + 'projects/new', project, {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifProject>;
  }
}
