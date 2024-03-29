import React, { useState } from "react";
import TItle from "../components/Common/Title";
import Checkbox from "../components/Common/CheckBox";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import Button from "../components/Common/Button";

export default function Reservation() {
  const [selectedessEntialOptions, setSelectedessEntialOptions] = useState([]);
  const [selectedOptionalOptions, setSelectedOptionalOptions] = useState([]);
  const [selectedAllOptions, setSelectedAllOptions] = useState([]);

  const essentialOptions = [
    { label: "[필수] 만 14세 이상 이용 동의", value: "14more" },
    { label: "[필수] 개인정보 수집 및 이용", value: "privacyCollection" },
    { label: "[필수] 개인정보 제 3자 제공", value: "privacyThirdParties" },
  ];

  const optionalOptions = [
    { label: "[선택] 이벤트, 혜택 정보 수신 동의", value: "eventInfo" },
    {
      label: "[선택] 이벤트, 혜택 정보 전송을 위한 개인정보 수집 및 이용 동의",
      value: "eventInfoCollection",
    },
  ];

  const allOptions = [{ label: "약관 전체 동의", value: "agreeToAll" }];

  const handleEssentialOptionChange = (options) => {
    setSelectedessEntialOptions(options);
  };
  const handleOptionalOptionsChange = (options) => {
    setSelectedOptionalOptions(options);
  };
  const handleAllOptionsChange = (options) => {
    setSelectedAllOptions(options);
  };

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24">
      <div className="content flex flex-col gap-16 grow">
        <TItle className="searchResult" tag="h2" text="예약하기"></TItle>
        <ReservationItem />
        <div className="flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded">
          <Checkbox
            options={essentialOptions}
            selectedOptions={selectedessEntialOptions}
            onChange={handleEssentialOptionChange}
          />
          <hr />
          <Checkbox
            options={optionalOptions}
            selectedOptions={selectedOptionalOptions}
            onChange={handleOptionalOptionsChange}
          />
          <hr />
          <Checkbox
            options={allOptions}
            selectedOptions={selectedAllOptions}
            onChange={handleAllOptionsChange}
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-center mb-6">
            총 결제 금액 : 1,000,000 원
          </p>
          <Button text="예약하기" className="w-full" />
        </div>
      </div>
    </div>
  );
}
