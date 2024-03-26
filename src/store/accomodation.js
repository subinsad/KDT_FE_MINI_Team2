import {create} from 'zustand';

// set 함수를 통해서만 상태를 변경할 수 있다
const useStore = create((set) => ({
    accomodation: [],

    async ajax() {
        try {
            const response = await fetch('../db.json');
            const data = await response.json();
            // 가져온 데이터를 상태에 업데이트
            set({ accomodation: data.accomodation });
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
}));

export default useStore;
