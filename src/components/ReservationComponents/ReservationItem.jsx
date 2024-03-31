import React from "react";
import PriceBlock from "../PriceBlock";
import useStore from "../../store/accomodation";
import { useParams } from "react-router-dom";

function ReservationItem() {
  const { data } = useStore();

  const { id, roomid } = useParams(); // useParams로 파라미터 가져오기

  const detailItemId = parseInt(id); // 숫자로 변경
  const roomItemId = parseInt(roomid);

  // 해당 ID와 일치하는 숙소 정보 찾기
  const detailItem = data.find((item) => item.id === detailItemId);
  // 해당 ID와 일치하는 객실 정보 찾기
  const roomItem = detailItem.room.find((item) => item.id === roomItemId);
  console.log(roomItem);
  return (
    <div className="flex items-center gap-4 grow">
      <img
        src={roomItem.roomImage}
        alt="숙소이미지"
        className="w-[200px] h-[200px] bg-slate-300 rounded"
      />
      <div className="flex flex-col gap-4 grow">
        <div>
          <p className="text-xl font-bold">{detailItem.accommodationName}</p>
          <span className="text-gray-500 text-sm">{detailItem.address}</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">{roomItem.roomName}</p>
          <div className="flex grow justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">
                2024.03.01(금) ~ 2024.03.02(토) | 1박
              </span>
              <span className="text-gray-500 text-sm">입실 14:00</span>
              <span className="text-gray-500 text-sm">퇴실 11:00</span>
            </div>
            <PriceBlock
              text={`-${detailItem.discount}%`}
              fixedPrice={detailItem.price}
              discountRate={detailItem.discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
