import {create} from 'zustand';

export const useUser = create((set) => ({
  loginUser: null,
  memberId: null,
  role: null,
  
  setLoginUser: (user) => set({ loginUser: user }),
  setMemberId: (memberId) => set({ memberId }),
  setRole: (role) => set({ role }),


  logout: () => set({ loginUser: null, memberId: null, role: null }),
})); 