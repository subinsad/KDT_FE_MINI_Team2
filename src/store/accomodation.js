import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    data: [], // 초기값은 빈 배열
    async ajax() {
        try {
            const response = await axios.get(
                '/public-api/v1/accommodation/all'
            );
            const responseData = await response.data;

            // 가져온 데이터에서 숙소 정보만 추출하여 상태에 업데이트
            const accommodations = responseData.data || []; // 숙소 정보 배열
            set({ data: accommodations });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
}));

export default useStore;
