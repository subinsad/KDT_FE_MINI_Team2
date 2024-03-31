import React from "react";
import TItle from "../components/Common/Title";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import Button from "../components/Common/Button";

export default function ReservationComplete() {
  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24">
      <div className="content flex flex-col gap-16 grow">
        <TItle className="searchResult" tag="h2" text="예약하기"></TItle>
        <p>예약이 완료되었습니다.</p>
        <ReservationItem />
        <Button text="돌아가기" className="w-full" />
      </div>
    </div>
  );
}
