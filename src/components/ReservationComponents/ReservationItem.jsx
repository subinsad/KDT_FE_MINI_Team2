import React from "react";
import PriceBlock from "../PriceBlock";
import useStore from "../../store/accomodation";
import { useParams } from "react-router-dom";

function ReservationItem() {
  const { accomodation } = useStore();
  const { accomodation_id, room_info } = useParams(); // useParams로 ID 가져오기
  // 해당 ID와 일치하는 숙소 정보 찾기
  const reservationItem = accomodation.find(
    (item) => item.accomodation_id === accomodation_id
  );
  console.log(reservationItem);

  return (
    <div className="flex items-center gap-4 grow">
      <img
        src="../img/Frame4.png"
        alt="숙소이미지"
        className="w-[200px] h-[200px] bg-slate-300 rounded"
      />
      <div className="flex flex-col gap-4 grow">
        <div>
          <p className="text-xl font-bold">
            {reservationItem?.accomodation_name}
          </p>
          <span className="text-gray-500 text-sm">위치</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">{room_info}</p>
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
              fixedPrice="2,000,000"
              discountPrice="1,000,000원"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
