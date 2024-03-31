import React from "react";
import StayItem from "../StayItem";
import PriceBlock from "../PriceBlock";

function SearchedStayList({ accomodation }) {
  return (
    <>
      {accomodation.map((item, index) => (
        <div key={index} className="stayItemBox flex gap-6 items-center">
          <img
            src="../img/Frame4.png"
            alt="숙소이미지"
            className="w-[480px] h-[270px] bg-slate-300 rounded"
          />
          <div className="stayDetail flex flex-col gap-16 grow items-end">
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
          </div>
        </div>
      ))}
    </>
  );
}

export default SearchedStayList;
