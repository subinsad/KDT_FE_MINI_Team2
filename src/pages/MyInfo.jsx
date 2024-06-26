import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import Title from "../components/Common/Title";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import Button from "../components/Common/Button";
import Input from "../components/Form/Input";
import Spinner from "../components/Common/Spinner";
import NumberPagination from "../components/NumberPagination";

export default function MyInfo() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [cookies] = useCookies(["secretKey"]);
  const [reservations, setReservations] = useState([]);
  const [myInfo, setMyInfo] = useState({
    email: "",
    name: "",
    phoneNumber: "",
  });
  const [formValues, setFormValues] = useState({
    password: "",
    name: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: "",
    name: "",
    phoneNumber: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 설정
  const [totalResults, setTotalResults] = useState(0);

  const goToPage = (pageNumber) => {
    const maxPages = Math.ceil(totalResults / 4);
    if (pageNumber > 0 && pageNumber <= maxPages) {
      setCurrentPage(pageNumber);
    }
  };

  const { memberId } = useParams();
  // 정규식 변수
  const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,15}$/;
  const nameReg = /^[가-힣]{2,10}$/;
  const phoneNumberReg = /^010-?\d{4}-?\d{4}$/;

  useEffect(() => {
    fetchMyInfo();
    fetchReservations();
  }, []);

  const handleTab1 = () => setActiveTab("personalInfo");
  const handleTab2 = () => setActiveTab("reservationHistory");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "password") {
      errorMsg = passwordReg.test(value)
        ? ""
        : "영문, 숫자, 특수문자를 포함하여 8~15자리로 입력해주세요.";
    } else if (name === "name") {
      errorMsg = nameReg.test(value)
        ? ""
        : "한글 이름을 2~10자리로 입력해주세요.";
    } else if (name === "phoneNumber") {
      errorMsg = phoneNumberReg.test(value)
        ? ""
        : "올바른 핸드폰 번호 형식을 입력해주세요.";
    }
    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(formErrors).every((error) => error === "") &&
        Object.values(formValues).some((value) => value !== "")
    );
  }, [formErrors, formValues]);

  const fetchMyInfo = async () => {
    try {
      const response = await axios.get(`/api/v1/member/info/${memberId}`, {
        headers: {
          Authorization: `Bearer ${cookies.secretKey}`,
        },
      });
      setMyInfo(response.data.data);
      setFormValues({
        name: response.data.data.name || "",
        phoneNumber: response.data.data.phoneNumber || "",
        password: "",
      });
    } catch (err) {
      console.error("err:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [currentPage]); // currentPage가 변경될 때마다 fetchReservations 호출

  const fetchReservations = async () => {
    try {
      setIsLoading(true); // 데이터를 가져오는 동안 로딩 상태 활성화
      const response = await axios.get("/api/v1/reservation", {
        params: {
          page: currentPage - 1, // 페이지가 1부터 시작한다고 가정
          limit: 4,
        },
        headers: {
          Authorization: `Bearer ${cookies.secretKey}`,
        },
      });
      if (response.data.data.result.length > 0) {
        setReservations(response.data.data.result);
        setTotalResults(response.data.data.totalCount);
      } else {
        setReservations([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("error:", error);
      setReservations([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  const updateMyInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isFormValid) return;

    try {
      const updatedValues = {
        name: formValues.name || myInfo.name,
        phoneNumber: formValues.phoneNumber || myInfo.phoneNumber,
        ...(formValues.password && { password: formValues.password }),
      };

      await axios.post(`/api/v1/member/update/${memberId}`, updatedValues, {
        headers: {
          Authorization: `Bearer ${cookies.secretKey}`,
        },
      });
      fetchMyInfo();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24 px-5 sm:px-0">
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
            <form className="flex flex-col gap-1" onSubmit={updateMyInfo}>
              <div className="mb-2">
                <p className="mb-1 font-light text-sm text-slate-600">이메일</p>
                <p className="bg-gray-100 py-3 px-4 font-light rounded text-gray-400">
                  {myInfo.email}
                </p>
              </div>
              <Input
                name="password"
                type="password"
                text="비밀번호"
                placeholder="새 비밀번호를 설정하려면 입력하세요"
                value={formValues.password}
                onChange={handleChange}
                className="mb-2 text-gray-400"
              />
              {formErrors.password && (
                <span className="text-red-500 text-sm">
                  {formErrors.password}
                </span>
              )}
              <Input
                name="name"
                type="text"
                text="이름"
                placeholder="이름"
                value={formValues.name}
                onChange={handleChange}
                className="mb-2 text-gray-400"
              />
              {formErrors.name && (
                <span className="text-red-500 text-sm">{formErrors.name}</span>
              )}
              <Input
                name="phoneNumber"
                type="text"
                text="핸드폰번호"
                placeholder="핸드폰 번호"
                value={formValues.phoneNumber}
                onChange={handleChange}
                className="mb-2 text-gray-400"
              />
              {formErrors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {formErrors.phoneNumber}
                </span>
              )}
              <Button
                text={isLoading ? <Spinner /> : "수정"}
                type="submit"
                className={`bg-gray-900 text-white mt-5 w-full ${
                  !isFormValid && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              />
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              {reservations.length > 0 ? (
                <>
                  {reservations.map((reservation, index) => (
                    <React.Fragment key={index}>
                      <ReservationItem
                        clickedRoom={reservation.room}
                        detailItem={reservation}
                        checkIn={reservation.checkIn}
                        checkOut={reservation.checkOut}
                      />
                      <hr />
                    </React.Fragment>
                  ))}
                  <NumberPagination
                    totalPosts={totalResults}
                    limit={4}
                    page={parseInt(currentPage)}
                    setPage={goToPage}
                  />
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-xl font-semibold">
                    예정된 여행이 없습니다.
                  </p>
                  <p className="text-gray-500 text-base">
                    지금 새로운 예약을 진행해보세요.
                  </p>
                  <Link to="/">
                    <Button
                      text="여행지 찾아보기"
                      type="button"
                      className="mt-5 bg-gray-900 text-white px-4 py-2 rounded"
                    />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
