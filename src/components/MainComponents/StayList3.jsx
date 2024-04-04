import React from "react";
import TItle from "../Common/Title";
import StayItem from "../StayItem";
import PriceBlock from "../PriceBlock";

import useStore from "../../store/accomodation";
import { Link } from "react-router-dom";

import noImg from "../../img/noImg.png";

function StayList3() {
  const { data } = useStore();

  const pickItem = data.sort(() => Math.random() - 0.5);

  return (
    <div>
      <TItle tag="h2" text="에디터 픽" className="mb-4" />
      <ul className="flex gap-4 overflow-x-scroll touch-pan-x md:overflow-auto">
        <div className="flex gap-3 w-fit">
          {pickItem.slice(0, 4).map((item, index) => (
            <Link
              to={`/detail/${item.id}`}
              key={index}
              value={item.accommodationType}
              className="rounded-xl border-transparent border-solid border hover:border-gray-300"
            >
              {item.accommodationImage && item.accommodationImage.length > 0 ? (
                <img
                  src={item.accommodationImage[0].imagePath}
                  alt="숙소이미지"
                  className="w-72 h-40 bg-slate-300 rounded-xl"
                />
              ) : (
                // 기본 이미지 또는 이미지가 없는 경우에 대한 처리
                <img
                  src={noImg}
                  alt="기본 이미지"
                  className="w-72 h-40 bg-slate-300 rounded-xl"
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

export default StayList3;
