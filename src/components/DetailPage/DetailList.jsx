import PriceBlock from "../PriceBlock";
import CheckInOut from "./CheckInOut";
import Button from "../Common/Button";
export default function DetailList() {
  return (
    <div className="w-[880px]">
      <div className="flex justify-between py-5 border-gray-200 border-solid border-b-2">
        <div className="flex gap-3 w-fit">
          <img
            src="../img/Frame4.png"
            alt="객실이미지"
            className=" w-52 h-52 bg-slate-300 rounded"
          />
          <CheckInOut
            stayTitle="객실 이름"
            checkIn="입실 14:00"
            checkOut="퇴실 11:00"
          />
        </div>

        <div className="mt-20 relative">
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
          <Button className="absolute right-0 bottom-5" text="객실 예약" />
        </div>
      </div>

      <div className="flex justify-between py-5 border-gray-200 border-solid border-b-2">
        <div className="flex gap-3 w-fit">
          <img
            src="../img/Frame4.png"
            alt="객실이미지"
            className=" w-52 h-52 bg-slate-300 rounded"
          />
          <CheckInOut
            stayTitle="객실 이름"
            checkIn="입실 14:00"
            checkOut="퇴실 11:00"
          />
        </div>

        <div className="mt-20 relative">
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
          <Button className="absolute right-0 bottom-5" text="객실 예약" />
        </div>
      </div>

      <div className="flex justify-between py-5 border-gray-200 border-solid border-b-2">
        <div className="flex gap-3 w-fit">
          <img
            src="../img/Frame4.png"
            alt="객실이미지"
            className=" w-52 h-52 bg-slate-300 rounded"
          />
          <CheckInOut
            stayTitle="객실 이름"
            checkIn="입실 14:00"
            checkOut="퇴실 11:00"
          />
        </div>

        <div className="mt-20 relative">
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
          <Button className="absolute right-0 bottom-5" text="객실 예약" />
        </div>
      </div>

      <div className="flex justify-between py-5 border-gray-200 border-solid border-b-2">
        <div className="flex gap-3 w-fit">
          <img
            src="../img/Frame4.png"
            alt="객실이미지"
            className=" w-52 h-52 bg-slate-300 rounded"
          />
          <CheckInOut
            stayTitle="객실 이름"
            checkIn="입실 14:00"
            checkOut="퇴실 11:00"
          />
        </div>

        <div className="mt-20 relative">
          <PriceBlock
            text="-50%"
            fixedPrice="2,000,000원"
            discountPrice="1,000,000원"
          />
          <Button className="absolute right-0 bottom-5" text="객실 예약" />
        </div>
      </div>
    </div>
  );
}
