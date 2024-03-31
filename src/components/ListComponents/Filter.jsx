import React, { useState, useEffect } from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import RangeSlider from "../Common/RangeSlider";

function Filter({ type, location, onApplyFilter }) {
  const [selectedType, setSelectedType] = useState(type);
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const typeOptions = [
    { label: "전체", value: "ALLTYPE" },
    { label: "모텔", value: "MOTEL" },
    { label: "호텔", value: "HOTEL" },
    { label: "리조트", value: "RESORT" },
    { label: "펜션", value: "PENSION" },
    { label: "캠핑", value: "CAMPING" },
    { label: "게스트하우스", value: "GUESTHOUSE" },
  ];
  const locationOptions = [
    { label: "전체", value: "ALLLOCATION" },
    { label: "제주", value: "JEJU" },
    { label: "서울", value: "SEOUL" },
    { label: "부산", value: "BUSAN" },
    { label: "강릉", value: "GANGNEUNG" },
    { label: "인천", value: "INCHEON" },
    { label: "경주", value: "GYEONGJU" },
  ];

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const applyFilter = () => {
    onApplyFilter({ selectedType, selectedLocation, minPrice, maxPrice });
  };

  return (
    <div className="filterBar flex flex-col gap-4 w-80">
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
      <div>
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
      <hr />
      {/* 필터 적용 버튼을 클릭할 때마다 applyFilter 함수 호출 */}
      <Button text="적용" className="w-full" onClick={applyFilter} />
    </div>
  );
}

export default Filter;
