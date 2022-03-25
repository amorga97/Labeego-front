import { Observable } from 'rxjs';
import { ifProject, UserStore } from '../interfaces/interfaces';

export const mockGetAllProjectsResponse = new Observable<ifProject[]>(() => {
  [mockProject];
});

export const mockTask = {
  _id: '623b056b50b6ab73f6fd3493',
  title: 'estudio del cliente',
  description: '¿qué desea? ¿con que presupuesto se siente cómodo?',
  project: '623b056b50b6ab73f6fd3491',
  status: 'done',
};

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
  toDo: [mockTask],
  doing: [mockTask],
  toReview: [],
  done: [mockTask, mockTask],
};

export const mockClient = {
  _id: '623ad8099b77229a92739534',
  name: 'Test',
  phone: ['123456'],
  email: 'test@test.com',
  address: { street: 'test', number: 1 },
  projects: ['1234556'],
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

export const mockInitialState = {
  user: {
    id: '4f4f4f4f4f4f4f4',
    teamLeader: 'test',
    userName: 'test',
    name: 'test',
    admin: true,
    mail: 'test',
    token: '8k8k8k8k8k8',
  },
};
