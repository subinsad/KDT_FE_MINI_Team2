// src/stores/useUser.js
import {create} from 'zustand';
import axios from 'axios';

const getStoredToken = () => localStorage.getItem("secretKey");

export const useUser = create((set) => ({
    loginUser: getStoredToken() ? { secretKey: getStoredToken() } : null,

    login: async (loginForm) => {
        try {
        const response = await axios.post("/public-api/v1/member/login", loginForm);
        console.log(response);
        const secretKey = response.data.data.secretKey;

        localStorage.setItem("secretKey", secretKey);

        // 사용자 정보 업데이트 (여기서는 예시로 secretKey만 저장)
        set({ loginUser: { secretKey } });
        } catch (error) {
        // 에러 처리
        console.error("로그인 실패:", error);
        throw error; // 컴포넌트 내에서 에러를 처리하기 위해 에러를 던집니다.
        }
    },
}));
