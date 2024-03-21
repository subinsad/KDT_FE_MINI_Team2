import React, { useEffect, useState } from "react";
import RadioButton from "../Common/RadioButton";
import Button from "../Common/Button";
import RangeSlider from "../Common/RangeSlider";

function Filter({ onFilterChange }) {
  const [selectedType, setSelectedType] = useState("allType");
  const [selectedLocation, setSelectedLocation] = useState("allLocation");

  const type = [
    { label: "전체", value: "allType" },
    { label: "모텔", value: "motel" },
    { label: "호텔", value: "hotel" },
    { label: "리조트", value: "resort" },
    { label: "펜션", value: "pension" },
    { label: "캠핑", value: "camping" },
    { label: "게스트하우스", value: "guesthouse" },
  ];
  const location = [
    { label: "전체", value: "allLocation" },
    { label: "제주", value: "jeju" },
    { label: "서울", value: "seoul" },
    { label: "부산", value: "busan" },
    { label: "강릉", value: "gangneung" },
    { label: "인천", value: "incheon" },
    { label: "경주", value: "gyeongju" },
  ];

  useEffect(() => {
    onFilterChange({ selectedType, selectedLocation });
  }, [selectedType, selectedLocation]);

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
        <RangeSlider />
      </div>
      <hr />
      <Button text="적용" className="w-full" />
    </div>
  );
}

export default Filter;
