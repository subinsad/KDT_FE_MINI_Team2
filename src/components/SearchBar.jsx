import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./Form/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Common/Button";

function SearchBar({ onSearch, className }) {
  const navigate = useNavigate();
  const params = useParams();

  const [location, setLocation] = useState(params.location || ""); // 지역명
  const [startDate, setStartDate] = useState(params.startDate || todayString); // 시작날짜
  const [endDate, setEndDate] = useState(params.endDate || tomorrowString); // 끝나는날짜
  const [personal, setPersonal] = useState(params.personal || ""); // 인원
  const [page, setPage] = useState(params.page || "1"); // 페이지

  // Date 객체를 "yyyy-mm-dd" 형식의 문자열로 변환하는 함수
  const formatDate = (date) => {
    if (!date) return null; // date가 null이면 null 반환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 오늘 날짜
  const today = new Date();

  // 오늘 날짜를 "yyyy-mm-dd" 형식의 문자열로 변환
  const todayString = formatDate(today);

  // 내일 날짜
  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);

  // 내일 날짜를 "yyyy-mm-dd" 형식의 문자열로 변환
  const tomorrowString = formatDate(tomorrow);

  useEffect(() => {
    setLocation(params.location || "제주");
    setStartDate(params.startDate || todayString);
    setEndDate(params.endDate || tomorrowString);
    setPersonal(params.personal || "2");
  }, [params]);

  const handleSearch = () => {
    const trimmedLocation = location.trim(); // 공백 제거
    if (!trimmedLocation) {
      alert("지역명을 입력해주세요."); // 지역명이 비어있을 경우 얼럿 표시
      return;
    }
    if (onSearch) {
      onSearch(trimmedLocation); // 부모 컴포넌트로 지역명 전달
    }
    if (params.type) {
      navigate(
        `/list/${startDate}/${endDate}/${encodeURIComponent(trimmedLocation)}/${
          params.type
        }/${personal}/${page}`
      );
    } else {
      navigate(
        `/list/${startDate}/${endDate}/${encodeURIComponent(
          trimmedLocation
        )}/호텔/${personal}/${page}`
      ); // 검색 후 페이지 이동
    }
  };

  // start date 변경 시
  const handleStartDateChange = (date) => {
    const formattedDate = formatDate(date); // Date 객체를 문자열로 변환
    setStartDate(formattedDate);
  };

  // end date 변경 시
  const handleEndDateChange = (date) => {
    const formattedDate = formatDate(date); // Date 객체를 문자열로 변환
    setEndDate(formattedDate);
  };

  const handlePersonalChange = (e) => {
    setPersonal(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
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
        selected={new Date(startDate)}
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
