import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Form/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Common/Button";

function SearchBar({ onSearch, className }) {
  const navigate = useNavigate();

  // 오늘 날짜
  const today = new Date();
  // 내일 날짜
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState(today); // 시작날짜
  const [endDate, setEndDate] = useState(tomorrow); // 끝나는날짜
  const [location, setLocation] = useState(""); // 지역명

  const handleSearch = () => {
    const trimmedLocation = location.trim(); // 공백 제거
    if (!trimmedLocation) {
      alert("지역명을 입력해주세요."); // 지역명이 비어있을 경우 얼럿 표시
      return;
    }
    if (onSearch) {
      onSearch(trimmedLocation); // 부모 컴포넌트로 지역명 전달
    }
    setLocation(""); // 검색 후에 지역명 입력 칸 비움
    navigate(`/list/ALLTYPE/${encodeURIComponent(trimmedLocation)}`); // 검색 후 페이지 이동
  };

  // start date 변경 시
  const handleStartDateChange = (date) => {
    const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
    console.log("Start Date:", formattedDate);
    setStartDate(date);
  };

  // end date 변경 시
  const handleEndDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 변환
      console.log("End Date:", formattedDate);
    }
    setEndDate(date); // null이어도 상태 업데이트
  };

  return (
    <div
      className={`flex flex-col w-full md:flex-row md:max-w-[1200px] md:gap-5 p-6 bg-white rounded-2xl  ${className}`}
    >
      <Input
        placeholder="지역명 입력"
        className="md:grow"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <DatePicker
        selectsRange={true} // 범위설정
        selected={startDate}
        onChange={(dates) => {
          handleStartDateChange(dates[0]);
          handleEndDateChange(dates[1]);
        }}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()} //지난날짜 비활성화
        className="md:grow h-8 p-6 rounded bg-gray-1 hover:bg-gray-200 hidden md:block"
      />
      <Input
        placeholder="인원 입력"
        className="md:grow bg-gray-1 hidden md:block"
      />
      <Button text="검색" onClick={handleSearch} className="" />
    </div>
  );
}

export default SearchBar;
