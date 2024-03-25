import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function RangeSlider({ minValue, maxValue, onApplyFilter }) {
  return (
    <>
      <MultiRangeSlider
        min={0}
        max={500000}
        minValue={minValue}
        maxValue={maxValue}
        step={50000}
        stepOnly={true}
        onInput={(e) =>
          onApplyFilter({ minValue: e.minValue, maxValue: e.maxValue })
        }
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
          <span>
            {maxValue >= 500000 ? `${maxValue}원 이상` : `${maxValue}원`}
          </span>
        </div>
      </div>
    </>
  );
}
