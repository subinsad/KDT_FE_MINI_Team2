import React, { useEffect, useState } from "react";
import Title from "../components/Common/Title";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import ChakraModal from "../components/ChakraModal";
import { useDisclosure } from "@chakra-ui/react";

export default function MyInfo() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [cookies] = useCookies(["secretKey"]);
  const [reservations, setReservations] = useState([]);
  const [myinfo, setMyInfo] = useState({});
  const { memberId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(myinfo);
  const handleTab1 = () => {
    setActiveTab("personalInfo");
  };

  const handleTab2 = () => {
    setActiveTab("reservationHistory");
  };

  // 내정보 수정
  // const updateMyInfo = async () => {
  //   try {
  //     const response = await axios.post(`/api/v1/member/update/${memberId}`,{
  //       name: myinfo.name,
  //       password: myinfo.email,
  //       phoneNumber: myinfo.phone,
  //       headers: {
  //         Authorization: `Bearer ${cookies.secretKey}`,
  //       },
  //     })
  //   }
  // }

  // 내정보 조회
  const fetchMyInfo = async () => {
    try {
      const response = await axios.get(`/api/v1/member/info/${memberId}`, {
        headers: {
          Authorization: `Bearer ${cookies.secretKey}`,
        },
      });
      setMyInfo(response.data.data);
    } catch (err) {
      console.error("err:", err);
    }
  };

  //예약내역 패치
  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/v1/reservation", {
        headers: {
          Authorization: `Bearer ${cookies.secretKey}`,
        },
      });
      setReservations(response.data.data); // 예약 내역을 상태로 설정
      console.log(response.data.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 조회
    fetchMyInfo();
    fetchReservations();
  }, []);

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24">
      <div className="content flex flex-col gap-6 grow">
        <Title className="searchResult" tag="h2" text={"마이 페이지"} />
        <ul className="flex border-b-[1px] border-solid  border-gray-300 font-bold text-xl cursor-pointer">
          <li
            className={`${
              activeTab === "personalInfo"
                ? " border-b-[1px] border-solid  border-gray-500"
                : "text-gray-300 "
            } p-2`}
            onClick={handleTab1}
          >
            내 정보
          </li>
          <li
            className={`${
              activeTab === "reservationHistory"
                ? " border-b-[1px] border-solid  border-gray-500"
                : "text-gray-300 "
            } p-2`}
            onClick={handleTab2}
          >
            예약내역
          </li>
        </ul>

        <div className="outlet">
          {activeTab === "personalInfo" ? (
            <div className="flex flex-col gap-8 relative">
              <div>
                <button
                  onClick={onOpen}
                  className="text-2xl absolute right-3 top-[-8px]"
                >
                  <FaPencilAlt />
                </button>
                <ChakraModal isOpen={isOpen} onClose={onClose}>
                  <h1 className="text-5xl font-medium mb-10">내 정보</h1>
                  <div className="flex flex-col">
                    <p className="mb-1 font-light text-sm text-slate-600">
                      이메일
                    </p>
                    <p className="bg-gray-100 py-3 px-4 font-light rounded">
                      {myinfo.email}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-light text-sm text-slate-600">
                      이름
                    </p>
                    <p className="bg-gray-100 py-3 px-4 font-light rounded">
                      {myinfo.name}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-light text-sm text-slate-600">
                      휴대폰 번호
                    </p>
                    <p className="bg-gray-100 py-3 px-4 font-light rounded">
                      {myinfo.phoneNumber}
                    </p>
                  </div>
                </ChakraModal>

                <p className="mb-1 font-light text-sm text-slate-600">이메일</p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                  {myinfo.email}
                </p>
              </div>
              <div>
                <p className="mb-1 font-light text-sm text-slate-600">이름</p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                  {myinfo.name}
                </p>
              </div>
              <div>
                <p className="mb-1 font-light text-sm text-slate-600">
                  휴대폰 번호
                </p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                  {myinfo.phoneNumber}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reservations.map((reservation, index) => (
                <React.Fragment key={index}>
                  <ReservationItem
                    clickedRoom={reservation.room}
                    detailItem={reservation}
                  />
                  <hr />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
