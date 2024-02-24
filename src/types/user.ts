export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  createdAt: moment.Moment;
}

export interface UserCreateData {
  name: {
    first: string;
    last: string;
  };
  email: string;
}
