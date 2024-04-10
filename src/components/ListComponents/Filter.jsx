import React, { useState, useEffect } from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import RangeSlider from "../Common/RangeSlider";

function Filter({
  type,
  location,
  onApplyFilter,
  hideFiltersHandler,
  className,
}) {
  const [selectedType, setSelectedType] = useState(type);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const typeOptions = [
    // { label: "전체", value: "전체타입" },
    { label: "모텔", value: "모텔" },
    { label: "호텔", value: "호텔" },
    { label: "리조트", value: "리조트" },
    { label: "펜션", value: "펜션" },
    { label: "캠핑", value: "캠핑" },
    { label: "게스트 하우스", value: "게스트 하우스" },
  ];
  const locationOptions = [
    // { label: "전체", value: "전체" },
    { label: "제주", value: "제주" },
    { label: "서울", value: "서울" },
    { label: "부산", value: "부산" },
    { label: "강릉", value: "강릉" },
    { label: "인천", value: "인천" },
    { label: "경주", value: "경주" },
  ];

  useEffect(() => {
    setSelectedLocation(location);
  }, [location]);

  // 숙소 유형 변경 핸들러
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // 숙소 지역 변경 핸들러
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  // 필터 적용 함수
  const applyFilterMobile = () => {
    onApplyFilter({ selectedType, selectedLocation, minPrice, maxPrice });
    hideFiltersHandler();
  };

  const applyFilter = () => {
    onApplyFilter({ selectedType, selectedLocation, minPrice, maxPrice });
  };

  return (
    <div
      className={`filterBar flex flex-col gap-4 w-full h-full p-4 bg-white large:w-80 ${className}`}
    >
      <div>
        <p className="text-lg font-semibold mb-3">유형</p>
        <RadioButton
          options={typeOptions}
          selectedOption={selectedType}
          onChange={handleTypeChange}
        />
      </div>
      <hr />
      <div>
        <p className="text-lg font-semibold mb-3">지역</p>
        <RadioButton
          options={locationOptions}
          selectedOption={selectedLocation}
          onChange={handleLocationChange}
        />
      </div>
      <hr />
      {/* <div>
                <p className="text-lg font-semibold mb-3">가격</p>
                <RangeSlider
                    minValue={minPrice}
                    maxValue={maxPrice}
                    onApplyFilter={({ minValue, maxValue }) => {
                        setMinPrice(minValue);
                        setMaxPrice(maxValue);
                    }}
                />
            </div>
            <hr /> */}
      <Button text="적용" onClick={applyFilterMobile} className="w-full" />
      <p onClick={hideFiltersHandler} className="text-center large:hidden">
        닫기
      </p>
    </div>
  );
}

export default Filter;
