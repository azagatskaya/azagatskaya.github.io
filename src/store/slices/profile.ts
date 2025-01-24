import { createSlice } from '@reduxjs/toolkit';
import users from 'src/shared/mock/users';

export enum RoleEnum {
  user = 0,
  admin = 1,
}

export type RoleType = RoleEnum.admin | RoleEnum.user | null;

export type ProfileType = {
  email: string | null;
  password: string | null;
  nickname: string | null;
  about: string | null;
  role: RoleType;
} | null;

const initialState: ProfileType = null;

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      updateMockUsers(action.payload);
      return action.payload;
    },
    clearProfile: () => null,
  },
});

const updateMockUsers = (p: ProfileType) => {
  const curProfile = users.find((u) => u.email === p.email);
  if (curProfile) Object.assign(curProfile, p);
};

export const { setProfile, clearProfile } = profileSlice.actions;

export const profile = profileSlice.reducer;
