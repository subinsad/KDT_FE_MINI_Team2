import React from "react";
import Button from "../Common/Button";
import Category from "../Common/Category";

function StayCategory() {
  return (
    <div className="flex gap-2">
      <Category text="전체" />
      <Category text="모텔" />
      <Category text="호텔" value="호텔" />
      <Category text="리조트" />
      <Category text="펜션" />
      <Category text="캠핑" />
      <Category text="게스트하우스" />
    </div>
  );
}

export default StayCategory;
