export interface UserStore {
  id: string;
  teamLeader: string;
  userName: string;
  userImage?: string;
  name: string;
  admin: boolean;
  mail: string;
  token: string;
}

export interface ifProject {
  _id: string;
  title: string;
  description: string;
  user: ifPartialUserStore;
  client: string;
  teamLeader: string;
  status: string;
  appointment: Date;
  lastUpdate: Date;
  tasks: object;
}

export interface ifPartialUserStore {
  id?: string;
  teamLeader?: string;
  userName?: string;
  userImage?: string;
  name?: string;
  admin?: boolean;
  mail?: string;
  token?: string;
}

export interface ifTask {
  id?: string;
  title: string;
  description: string;
  project: string;
  status: string;
}
