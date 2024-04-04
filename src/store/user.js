import {create} from 'zustand';

export const useUser = create((set) => ({
  loginUser: null,
  memberId: null,
  
  setLoginUser: (user) => set({ loginUser: user }),
  setMemberId: (memberId) => set({ memberId }),


  logout: () => set({ loginUser: null, memberId: null}),
})); 