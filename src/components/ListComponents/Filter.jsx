import React, { useEffect, useState } from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import RangeSlider from "../Common/RangeSlider";

function Filter({ onApplyFilter }) {
  const [selectedType, setSelectedType] = useState("전체유형");
  const [selectedLocation, setSelectedLocation] = useState("전체지역");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const type = [
    { label: "전체", value: "전체유형" },
    { label: "모텔", value: "모텔" },
    { label: "호텔", value: "호텔" },
    { label: "리조트", value: "리조트" },
    { label: "펜션", value: "펜션" },
    { label: "캠핑", value: "캠핑" },
    { label: "게스트하우스", value: "게스트하우스" },
  ];
  const location = [
    { label: "전체", value: "전체지역" },
    { label: "제주", value: "제주" },
    { label: "서울", value: "서울" },
    { label: "부산", value: "부산" },
    { label: "강릉", value: "강릉" },
    { label: "인천", value: "인천" },
    { label: "경주", value: "경주" },
  ];

  const applyFilter = () => {
    onApplyFilter({ selectedType, selectedLocation, minPrice, maxPrice });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="filterBar flex flex-col gap-4 w-80">
      <div>
        <p className="text-lg font-semibold mb-3">유형</p>
        <RadioButton
          options={type}
          selectedOption={selectedType}
          onChange={handleTypeChange}
        />
      </div>
      <hr />
      <div>
        <p className="text-lg font-semibold mb-3">지역</p>
        <RadioButton
          options={location}
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
      <Button text="적용" className="w-full" onClick={applyFilter} />
    </div>
  );
}

export default Filter;
