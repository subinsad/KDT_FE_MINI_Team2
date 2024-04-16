import create from "zustand";

const useStore = create((set) => ({
  notice: [], // 초기값은 빈 배열
  async ajax() {
    try {
      const response = await fetch("../../db.json"); // 또는 서버의 URL로 변경
      const responseData = await response.json(); // json() 메서드를 사용하여 JSON 데이터 추출

      // 가져온 데이터에서 숙소 정보만 추출하여 상태에 업데이트
      const notice = responseData.notice || []; // 숙소 정보 배열
      set({ notice: notice });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default useStore;
