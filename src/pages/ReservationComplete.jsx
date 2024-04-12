import React, { useEffect } from "react";
import Title from "../components/Common/Title";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import Button from "../components/Common/Button";
import useStore from "../store/accomodation";
import { Link, useParams } from "react-router-dom";

export default function ReservationComplete() {
  const { data } = useStore();
  const { id, roomid } = useParams();
  const detailItemId = parseInt(id);
  const roomItemId = parseInt(roomid);

  const detailItem = data.find((item) => item.id === detailItemId);
  const clickedRoom = detailItem?.room.find((room) => room.id === roomItemId);

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24 px-5 sm:px-0">
      <div className="content flex flex-col gap-16 grow">
        <Title className="searchResult" tag="h2" text="예약하기"></Title>
        <p>예약이 완료되었습니다.</p>
        <ReservationItem clickedRoom={clickedRoom} detailItem={detailItem} />
        <Link to="/">
          <Button text="돌아가기" className="w-full" />
        </Link>
      </div>
    </div>
  );
}
