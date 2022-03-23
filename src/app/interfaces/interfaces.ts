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

export interface ifNewProject {
  title: string;
  description: string;
  client: string;
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

export interface ifClient {
  _id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
  };
  projects: string[];
}

export interface ifNewClient {
  name: string;
  email: string;
  address: {
    street: string;
    number: number;
  };
}
