import { Observable } from 'rxjs';
import { ifProject, UserStore } from '../interfaces/interfaces';

export const mockGetAllProjectsResponse = new Observable<ifProject[]>(() => {
  [mockProject];
});

export const mockProject: ifProject = {
  _id: '12345',
  title: 'test',
  description: 'test description',
  user: {},
  client: 'someClient',
  teamLeader: 'someUser',
  status: 'test',
  appointment: new Date(),
  lastUpdate: new Date(),
  toDo: [],
  doing: [],
  toReview: [],
  done: [],
};

export const mockUser: UserStore = {
  id: '12334',
  teamLeader: '123434',
  userName: 'amorga97',
  userImage: 'image-url',
  name: 'Antonio',
  admin: true,
  mail: 'test@test.com',
  token: '123456784342geshrtw',
};
