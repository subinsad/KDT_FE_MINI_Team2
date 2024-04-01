import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Form/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Common/Button";

function SearchBar({ onSearch, className }) {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date()); // 시작날짜
  const [endDate, setEndDate] = useState(new Date()); // 끝나는날짜
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

  return (
    <div className={`flex  gap-5  p-6 bg-white rounded-2xl ${className}`}>
      <Input
        placeholder="지역명 입력"
        className="w-80"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <DatePicker
        selectsRange={true} // 범위설정
        selected={startDate}
        onChange={(dates) => onChange(dates)}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()} //지난날짜 비활성화
        className="w-80 h-8 p-6 rounded bg-gray-1"
      />
      <Input placeholder="인원 입력" className="w-80 bg-gray-1" />
      <Button text="검색" onClick={handleSearch} className="" />
    </div>
  );
}

export default SearchBar;
