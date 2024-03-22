import React from "react";
import PriceBlock from "../PriceBlock";

function ReservationItem() {
  return (
    <div className="flex items-center gap-4 grow">
      <img
        src="../img/Frame4.png"
        alt="숙소이미지"
        className="w-[200px] h-[200px] bg-slate-300 rounded"
      />
      <div className="flex flex-col gap-4 grow">
        <div>
          <p className="text-xl font-bold">숙소 이름</p>
          <span className="text-gray-500 text-sm">위치</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">객실 이름</p>
          <div className="flex grow justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">
                2024.03.01(금) ~ 2024.03.02(토) | 1박
              </span>
              <span className="text-gray-500 text-sm">입실 14:00</span>
              <span className="text-gray-500 text-sm">퇴실 11:00</span>
            </div>
            <PriceBlock
              text="-50%"
              fixedPrice="2,000,000원"
              discountPrice="1,000,000원"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
