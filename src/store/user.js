import {create} from 'zustand';

export const useUser = create((set) => ({
  loginUser: null,

  setLoginUser: (user) => set({ loginUser: user }),

  logout: () => set({ loginUser: null }),
}));