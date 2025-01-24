import { ProfileType } from 'src/store/slices/profile';

const users: ProfileType[] = [
  {
    email: 'admin@gmail.com',
    password: '123qweasd',
    nickname: 'Admin',
    about: null,
    role: 1,
  },
  {
    email: 'user@gmail.com',
    password: '123qweasd',
    nickname: 'User',
    about: null,
    role: 0,
  },
];

export default users;
