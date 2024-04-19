import React from "react";
import { useLocation } from "react-router-dom";
import Title from "../Common/Title";
import ReservationItem from "../ReservationComponents/ReservationItem";
import Button from "../Common/Button";
import { Link } from "react-router-dom";

export default function CartComplete() {
  const location = useLocation();
  const cart = location.state?.reservationData?.data || []; // 'reservationData'에서 데이터 접근

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24 px-5 sm:px-0">
      <div className="content flex flex-col gap-16 grow">
        <Title className="searchResult" tag="h2" text="예약 완료"></Title>
        <p>예약이 완료되었습니다.</p>
        {cart.map((item, index) => (
          <ReservationItem
            key={index}
            clickedRoom={item}
            detailItem={item}
            checkIn={item.checkIn}
            checkOut={item.checkOut}
          />
        ))}
        <Link to="/">
          <Button text="돌아가기" className="w-full" />
        </Link>
      </div>
    </div>
  );
}
