import Input from "./Form/Input";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Common/Button";

function SearchBar({ onSearch, className }) {
  const [startDate, setStartDate] = useState(new Date()); //시작날짜
  const [endDate, setEndDate] = useState(new Date()); //끝나는날짜
  const [location, setLocation] = useState(""); // 지역명

  //함수작성
  const onChange = (dates) => {
    const [start, end] = dates;
  };

  const handleSearch = () => {
    onSearch(location);
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
