import React, { useEffect } from "react";
import TItle from "../Common/Title";
import StayItem from "../StayItem";
import PriceBlock from "../PriceBlock";

import useStore from "../../store/accomodation";
import { useState } from "react";
import Category from "../Common/Category";
import { Link } from "react-router-dom";

function StayList1() {
  const { data, ajax } = useStore(); // accomodation 상태와 ajax 함수 가져오기
  const [filterItem, setFilterItem] = useState([]); // 초기값은 빈배열

  const [isActive, setIsActive] = useState("all");

  useEffect(() => {
    // 페이지가 로드될 때 데이터 가져오기
    ajax();
  }, [ajax]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

  useEffect(() => {
    // 데이터가 변경될 때마다 filterItem 업데이트
    if (Array.isArray(data) && data.length > 0) {
      setFilterItem(data);
    }
  }, [data]);
  const itemsToDisplay = filterItem || data || []; //둘중하나를 사용

  const btnItem = [...new Set(data?.map((item) => item.accommodationType))]; //버튼 카테고리

  const handleBtn = (accommodationType) => {
    if (accommodationType === "all") {
      setFilterItem(data);
    } else {
      const filteredItems = data.filter(
        (item) => item.accommodationType === accommodationType
      );
      setFilterItem(filteredItems);
    }
    setIsActive(accommodationType);
  };

  return (
    <div className="flex flex-col gap-4">
      <TItle tag="h2" text="인기 숙소" />

      <div className="flex gap-2">
        <Category
          text="전체"
          value="all"
          onClick={() => handleBtn("all")}
          isActive={isActive === "all"}
        />
        {btnItem
          ?.sort((a, b) => a.localeCompare(b))
          .map((accommodationType, index) => (
            <Category
              key={index}
              text={accommodationType}
              value={accommodationType}
              onClick={() => handleBtn(accommodationType)}
              isActive={isActive === accommodationType}
            />
          ))}
      </div>

      <ul className="flex gap-4 overflow-x-scroll touch-pan-x md:overflow-auto">
        <div className="flex gap-3 w-fit">
          {itemsToDisplay
            ?.sort((a, b) => b.star - a.star)
            .slice(0, 4)
            .map((item, index) => (
              <Link
                to={`/detail/${item.id}`}
                key={index}
                value={item.accommodationType}
                className="rounded-xl border-transparent border-solid border hover:border-gray-300"
              >
                {item.accommodationImage &&
                item.accommodationImage.length > 0 ? (
                  <img
                    src={item.accommodationImage[0].imagePath}
                    alt="숙소이미지"
                    className="w-72 h-40 bg-slate-300 rounded-xl"
                  />
                ) : (
                  // 기본 이미지 또는 이미지가 없는 경우에 대한 처리
                  <img
                    src="/path/to/default/image"
                    alt="기본 이미지"
                    className="w-72 h-40 bg-slate-300 rounded"
                  />
                )}
                <StayItem
                  category={item.accommodationType}
                  star={item.rate}
                  stayTitle={item.accommodationName}
                  position={item.locationType}
                />
                <PriceBlock
                  text={`-${item.discount}%`}
                  fixedPrice={item.price}
                  discountRate={item.discount}
                />
              </Link>
            ))}
        </div>
      </ul>
    </div>
  );
}

export default StayList1;
