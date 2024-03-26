import { create } from 'zustand';

export const useUser = create((set) => ({
  loginUser: null, // 초기 상태는 null이나 적절한 기본값으로 설정

  setLoginUser: (user) => set({ loginUser: user }), // 로그인 유저 정보 업데이트 함수
}));
