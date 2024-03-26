import React, { useState } from "react";
import TItle from "../components/Common/Title";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import Button from "../components/Common/Button";

export default function MyInfo() {
  const [activeTab, setActiveTab] = useState("personalInfo");

  const handleTab1 = () => {
    setActiveTab("personalInfo");
  };

  const handleTab2 = () => {
    setActiveTab("reservationHistory");
  };

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24">
      <div className="content flex flex-col gap-6 grow">
        <TItle className="searchResult" tag="h2" text={"마이 페이지"} />
        <ul className="flex">
          <li
            className={activeTab === "personalInfo" ? "active" : ""}
            onClick={handleTab1}
          >
            내 정보
          </li>
          <li
            className={activeTab === "reservationHistory" ? "active" : ""}
            onClick={handleTab2}
          >
            예약내역
          </li>
        </ul>

        <div className="outlet">
          {activeTab === "personalInfo" ? (
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-1 font-light text-sm text-slate-600">이메일</p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                  Email@email.com
                </p>
              </div>
              <div>
                <p className="mb-1 font-light text-sm text-slate-600">이름</p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                  User_Name
                </p>
              </div>
              <div>
                <p className="mb-1 font-light text-sm text-slate-600">
                  휴대폰 번호
                </p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                  010-1234-5678{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <hr />
              <ReservationItem />
              <hr />
              <ReservationItem />
              <hr />
              <ReservationItem />
              <hr />
              <ReservationItem />
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
