export interface UserStore {
  _id?: string;
  teamLeader?: string;
  userName: string;
  name: string;
  userImage: string;
  admin: boolean;
  mail: string;
  projects?: string[];
}
