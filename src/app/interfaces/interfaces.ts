export interface UserStore {
  id: string;
  teamLeader: string;
  userName: string;
  name: string;
  admin: boolean;
  mail: string;
  token: string;
}

export interface ifProject {
  _id: string;
  title: string;
  description: string;
  user: string;
  client: string;
  teamLeader: string;
  status: string;
  appointment: Date;
  lastUpdate: Date;
  tasks: object;
}
