import React from "react";
import PriceBlock from "../PriceBlock";
import { useParams } from "react-router-dom";

function ReservationItem({ clickedRoom, detailItem, checkIn, checkOut }) {
  const roomImage = clickedRoom?.roomImage || "";
  const accommodationName = detailItem?.accommodationName || "";
  const address = detailItem?.address || "";
  const roomName = clickedRoom?.roomName || "";
  const discount = detailItem?.discount || "";
  const price = detailItem?.price || "";
  const { startDate, endDate } = useParams();

  // 날짜 객체 생성
  const start = new Date(startDate);
  const end = new Date(endDate);
  // 내역날짜
  const checkin = new Date(checkIn);
  const checkout = new Date(checkOut);
  // 박수 계산: 종료 날짜에서 시작 날짜를 빼고, 결과를 밀리초에서 일(days) 단위로 변환
  const night = Math.round((end - start) / (1000 * 60 * 60 * 24));
  const nights = Math.round((checkout - checkin) / (1000 * 60 * 60 * 24));

  return (
    <div className="flex items-center gap-4 grow flex-col sm:flex-row">
      <img
        src={roomImage}
        alt="숙소이미지"
        className="w-72 h-72 sm:w-[200px] sm:h-[200px] bg-slate-300 rounded"
      />
      <div className="flex flex-col gap-4 grow w-72 h-72 sm:w-[200px] sm:h-[200px]">
        <div>
          <p className="text-xl font-bold">{accommodationName}</p>
          <span className="text-gray-500 text-sm">{address}</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">{roomName}</p>
          <div className="flex grow justify-between flex-col sm:flex-row">
            <div className="flex flex-col items-end sm:items-start">
              {checkIn ? (
                <span className="text-gray-500 text-sm">{`${checkIn} ~ ${checkOut} | ${nights}박`}</span>
              ) : (
                <span className="text-gray-500 text-sm">{`${startDate} ~ ${endDate} | ${night}박`}</span>
              )}
              <span className="text-gray-500 text-sm">입실 14:00</span>
              <span className="text-gray-500 text-sm">퇴실 11:00</span>
            </div>
            <div className="flex flex-col items-end sm:items-start">
              <PriceBlock
                text={`-${discount}%`}
                fixedPrice={price}
                discountRate={discount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
