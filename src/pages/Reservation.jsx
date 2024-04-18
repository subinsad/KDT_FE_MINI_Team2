import React, { useEffect, useState } from "react";
import Title from "../components/Common/Title";
import Checkbox from "../components/Common/CheckBox";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import Button from "../components/Common/Button";
import useStore from "../store/accomodation";
import { useNavigate, useParams } from "react-router-dom";
import FixedPrice from "../components/ReservationComponents/FixedPrice";
import axios from "axios";
import { useCookies } from "react-cookie";
import Spinner from "../components/Common/Spinner";

export default function Reservation() {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(["secretKey"]);
  const navigate = useNavigate();
  const { data, ajax } = useStore();
  const { id, roomid, startDate, endDate } = useParams();
  const detailItemId = parseInt(id);
  const roomItemId = parseInt(roomid);

  const detailItem = data.find((item) => item.id === detailItemId);
  const clickedRoom = detailItem?.room.find((room) => room.id === roomItemId);
  const price = detailItem?.price || "";
  const discount = detailItem?.discount || "";

  useEffect(() => {
    ajax();
  }, []);

  const [selectedEssentialOptions, setSelectedEssentialOptions] = useState([
    false,
    false,
    false,
  ]);
  const [selectedOptionalOptions, setSelectedOptionalOptions] = useState([
    false,
    false,
  ]);
  const [selectedAllOptions, setSelectedAllOptions] = useState(false);

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

  useEffect(() => {
    const allEssentialChecked = selectedEssentialOptions.every(Boolean);
    const allOptionalChecked = selectedOptionalOptions.every(Boolean);
    setSelectedAllOptions(allEssentialChecked && allOptionalChecked);
  }, [selectedEssentialOptions, selectedOptionalOptions]);

  const handleEssentialOptionChange = (index) => {
    const updatedEssentials = [...selectedEssentialOptions];
    updatedEssentials[index] = !updatedEssentials[index];
    setSelectedEssentialOptions(updatedEssentials);
  };

  const handleOptionalOptionsChange = (index) => {
    const updatedOptionals = [...selectedOptionalOptions];
    updatedOptionals[index] = !updatedOptionals[index];
    setSelectedOptionalOptions(updatedOptionals);
  };

  const handleAllOptionsChange = () => {
    const newState = !selectedAllOptions;
    setSelectedAllOptions(newState);
    setSelectedEssentialOptions(Array(essentialOptions.length).fill(newState));
    setSelectedOptionalOptions(Array(optionalOptions.length).fill(newState));
  };

  const handleSubmitReservation = async () => {
    setIsLoading(true);
    if (!selectedEssentialOptions.every(Boolean)) {
      alert("필수 항목을 모두 동의해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "/api/v1/reservation/insert",
        {
          roomId: roomid,
          roomName: clickedRoom.roomName,
          checkIn: startDate,
          checkOut: endDate,
          fixedMember: 2,
          maxedMember: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretKey}`,
          },
        }
      );
      navigate(
        `/reservationcomplete/${id}/${roomid}/${startDate}/${endDate}/2`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("예약 실패:", error);
      alert("예약에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로그인 프로세스 종료, 텍스트 복원을 위한 상태 변경
    }
  };

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24 px-5 sm:px-0">
      <div className="content flex flex-col gap-16 grow">
        <Title className="searchResult" tag="h2" text="예약하기" />
        <ReservationItem clickedRoom={clickedRoom} detailItem={detailItem} />
        <div className="flex flex-col gap-2 p-4 border border-solid border-gray-200 rounded">
          {essentialOptions.map((option, index) => (
            <div key={option.value} className="flex items-center">
              <Checkbox
                options={[option]}
                selectedOptions={[selectedEssentialOptions[index]]}
                onChange={() => handleEssentialOptionChange(index)}
                checked={selectedEssentialOptions[index]} // 여기서 checked prop을 설정해야 합니다.
              />
            </div>
          ))}
          <hr />
          {optionalOptions.map((option, index) => (
            <div key={option.value} className="flex items-center">
              <Checkbox
                options={[option]}
                selectedOptions={[selectedOptionalOptions[index]]}
                onChange={() => handleOptionalOptionsChange(index)}
                checked={selectedOptionalOptions[index]} // 여기서 checked prop을 설정해야 합니다.
              />
            </div>
          ))}
          <hr />
          <div className="flex items-center">
            <Checkbox
              options={allOptions}
              selectedOptions={[selectedAllOptions]}
              onChange={handleAllOptionsChange}
              checked={selectedAllOptions} // 여기서 checked prop을 설정해야 합니다.
            />
          </div>
        </div>

        <div>
          <FixedPrice fixedPrice={price} discountRate={discount} />
          <Button
            className={`bg-gray-900 text-white mt-10 w-full ${
              !selectedEssentialOptions.every(Boolean)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleSubmitReservation}
            disabled={!selectedEssentialOptions.every(Boolean)}
            text={isLoading ? <Spinner /> : "예약하기"}
          />
        </div>
      </div>
    </div>
  );
}
