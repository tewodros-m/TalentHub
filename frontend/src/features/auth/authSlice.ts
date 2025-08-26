import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types/authTypes';
import { storage } from '../../utils/localStorage';

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      storage.set('user', action.payload.user);
      storage.set('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.remove('user');
      storage.remove('token');
    },
    loadStoredAuth: (state) => {
      const token = storage.get<string>('token');
      const user = storage.get<User>('user');
      if (token && user) {
        state.token = token;
        state.user = user;
      }
    },
  },
});

export const { setCredentials, logout, loadStoredAuth } = authSlice.actions;
export default authSlice.reducer;
