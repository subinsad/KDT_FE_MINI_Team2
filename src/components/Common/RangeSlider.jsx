import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function App() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  return (
    <div className="App">
      <div className="multi-range-slider-container">
        <MultiRangeSlider
          min={0}
          max={500000}
          minValue={0}
          maxValue={500000}
          step={50000}
          stepOnly={true}
          onInput={(e) => {
            setMinValue(e.minValue);
            setMaxValue(e.maxValue);
          }}
          label={false}
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "8px" }}
          barLeftColor="#D9D9D9"
          barInnerColor="#2393D2"
          barRightColor="#D9D9D9"
          thumbLeftColor="#2393D2"
          thumbRightColor="#2393D2"
        />
        <div className="font-semibold text-gray-600">
          <div>
            <span>{minValue}원 ~ </span>
            <span>{maxValue}원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
