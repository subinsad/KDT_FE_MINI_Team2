import React from "react";
import StayItem from "../StayItem";
import PriceBlock from "../PriceBlock";

function SearchedStayList() {
  return (
    <>
      <div className="stayItemBox flex gap-6 items-center">
        <img
          src="../img/Frame4.png"
          alt="숙소이미지"
          className="w-[480px] h-[270px] bg-slate-300 rounded"
        />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <StayItem
            category="숙소 종류"
            star="10.0"
            stayTitle="숙소 이름"
            position="위치"
          />
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
        </div>
      </div>
      <hr />
      <div className="stayItemBox flex gap-6 items-center">
        <img
          src="../img/Frame4.png"
          alt="숙소이미지"
          className="w-[480px] h-[270px] bg-slate-300 rounded"
        />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <StayItem
            category="숙소 종류"
            star="10.0"
            stayTitle="숙소 이름"
            position="위치"
          />
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
        </div>
      </div>
      <hr />
      <div className="stayItemBox flex gap-6 items-center">
        <img
          src="../img/Frame4.png"
          alt="숙소이미지"
          className="w-[480px] h-[270px] bg-slate-300 rounded"
        />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <StayItem
            category="숙소 종류"
            star="10.0"
            stayTitle="숙소 이름"
            position="위치"
          />
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
        </div>
      </div>
      <hr />
      <div className="stayItemBox flex gap-6 items-center">
        <img
          src="../img/Frame4.png"
          alt="숙소이미지"
          className="w-[480px] h-[270px] bg-slate-300 rounded"
        />
        <div className="stayDetail flex flex-col gap-16 grow items-end">
          <StayItem
            category="숙소 종류"
            star="10.0"
            stayTitle="숙소 이름"
            position="위치"
          />
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
        </div>
      </div>
    </>
  );
}

export default SearchedStayList;
