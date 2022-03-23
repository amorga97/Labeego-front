import { Observable } from 'rxjs';
import { ifProject } from '../interfaces/interfaces';

export const mockGetAllProjectsResponse = new Observable<ifProject[]>(() => {
  [
    {
      _id: '12345',
      title: 'test',
      description: 'test description',
      user: 'someUser',
      client: 'someClient',
      teamLeader: 'someUser',
      status: 'test',
      appointment: new Date(),
      lastUpdate: new Date(),
      toDo: [],
      doing: [],
      toReview: [],
      done: [],
    },
  ];
});
