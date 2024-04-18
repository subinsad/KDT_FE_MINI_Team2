import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Form/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Common/Button";
import { getCurrentDate, getTomorrowDate } from "../data/date";

function SearchBar({ onSearch, className }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // 오늘과 내일 날짜 계산
  const today = getCurrentDate();
  const tomorrow = getTomorrowDate();

  const formatDate = (date) => {
    if (!date) return null; // date가 null이면 null 반환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [location, setLocation] = useState(queryParams.get("location") || "");
  const [startDate, setStartDate] = useState(queryParams.get("checkIn"));
  const [endDate, setEndDate] = useState(queryParams.get("checkOut"));
  const [personal, setPersonal] = useState(queryParams.get("personal") || "");
  const [page, setPage] = useState(queryParams.get("page") || "1");

  // 컴포넌트가 마운트되면 각 파라미터의 값을 변경
  useEffect(() => {
    setLocation(queryParams.get("location") || "제주");
    setStartDate(queryParams.get("checkIn") || today);
    setEndDate(queryParams.get("checkOut") || tomorrow);
    setPersonal(queryParams.get("personal") || 2);
  }, [search]);
  // 컴포넌트가 마운트되면 각 파라미터의 값을 변경

  // 검색 기능
  const handleSearch = () => {
    const trimmedLocation = location.trim();
    if (!trimmedLocation) {
      alert("지역명을 입력해주세요.");
      return;
    }
    // 부모컴포넌트인 list가 있을 땐 onSearch실행 아닐땐 else조건 실행
    if (onSearch) {
      onSearch(trimmedLocation);
    } else {
      navigate(
        `/list?type=호텔&location=${encodeURIComponent(
          trimmedLocation
        )}&checkIn=${startDate}&checkOut=${endDate}&personal=${personal}&page=${page}`
      );
    }
  };
  // 검색 기능

  const handleStartDateChange = (date) => {
    const formattedDate = formatDate(date); // Date 객체를 문자열로 변환
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = formatDate(date); // Date 객체를 문자열로 변환
    setEndDate(formattedDate);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePersonalChange = (e) => {
    setPersonal(e.target.value);
  };

  return (
    <div
      className={`flex flex-col gap-2 w-full p-6 bg-white rounded-2xl medium:flex-row md:max-w-[1200px] md:gap-5 ${className}`}
    >
      <Input
        placeholder="지역명 입력"
        className="medium:w-[33%]"
        value={location}
        onChange={handleLocationChange}
        showLabel={false}
      />
      <DatePicker
        selectsRange={true}
        selected={startDate}
        onChange={(dates) => {
          handleStartDateChange(dates[0]);
          handleEndDateChange(dates[1]);
        }}
        enableTabLoop={false}
        startDate={new Date(startDate)}
        endDate={endDate ? new Date(endDate) : null}
        minDate={new Date()}
        className="w-full h-8 px-4 py-6 rounded bg-gray-1 hover:bg-gray-200 medium:w-64 large:w-80"
      />
      <Input
        placeholder="인원 입력"
        className="medium:w-[33%]"
        value={personal}
        onChange={handlePersonalChange}
        showLabel={false}
      />
      <Button text="검색" onClick={handleSearch} className="min-w-16" />
    </div>
  );
}

export default SearchBar;
