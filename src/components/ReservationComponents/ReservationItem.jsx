import React from "react";
import PriceBlock from "../PriceBlock";

function ReservationItem({ clickedRoom, detailItem }) {
  const roomImage = detailItem?.roomImage || "";
  const accommodationName = detailItem?.accommodationName || "";
  const address = detailItem?.address || "";
  const roomName = clickedRoom?.roomName || "";
  const discount = detailItem?.discount || "";
  const price = detailItem?.price || "";

  return (
    <div className="flex items-center gap-4 grow">
      <img
        src={roomImage}
        alt="숙소이미지"
        className="w-[200px] h-[200px] bg-slate-300 rounded"
      />
      <div className="flex flex-col gap-4 grow">
        <div>
          <p className="text-xl font-bold">{accommodationName}</p>
          <span className="text-gray-500 text-sm">{address}</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">{roomName}</p>
          <div className="flex grow justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">
                2024.03.01(금) ~ 2024.03.02(토) | 1박
              </span>
              <span className="text-gray-500 text-sm">입실 14:00</span>
              <span className="text-gray-500 text-sm">퇴실 11:00</span>
            </div>
            <PriceBlock
              text={`-${discount}%`}
              fixedPrice={price}
              discountRate={discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
