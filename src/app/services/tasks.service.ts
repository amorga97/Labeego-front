import { Injectable } from '@angular/core';
import { ifTask } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  changeStatus(token: string, taskid: string, projectId: string, task: ifTask) {
    return this.http.patch(
      environment.backUrl + `tasks/${projectId}/${taskid}`,
      task,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ) as Observable<ifTask>;
  }

  create(projectId: string, token: string, task: Partial<ifTask>) {
    return this.http.post(environment.backUrl + `tasks/${projectId}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    }) as Observable<ifTask>;
  }

  remove(projectId: string, token: string, taskId: string) {
    return this.http.delete(
      environment.backUrl + `tasks/${projectId}/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ) as Observable<ifTask>;
  }
}
