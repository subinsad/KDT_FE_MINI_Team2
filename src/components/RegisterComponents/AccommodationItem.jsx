import React, { useState } from "react";
import axios from "axios";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import Button from "../Common/Button";

function AccommodationItem({
  title,
  text,
  room,
  type,
  onClick,
  btn,
  id,
  setAccommodations,
  cookies,
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  // 삭제
  const deleteBtn = async () => {
    console.log(id);
    try {
      const response = await axios.delete(
        `/api/v1/accommodation/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${cookies.secretKey}`,
          },
        }
      );
      const responseData = response.data;
      // 숙소 정보 업데이트
      setAccommodations(responseData.data || []);

      setIsDeleted(true);
      console.log(isDeleted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return isDeleted ? null : (
    <ul>
      <li className="gap-4 pt-4 pb-4 medium:pt-5 medium:pb-5">
        <div
          onClick={onClick}
          className="flex flex-col gap-4 hover:cursor-pointer medium:gap-2"
        >
          <p className="text-xl font-bold"> {title} </p>
          <div className="flex flex-col gap-4 medium:flex-row medium:items-center medium:justify-between">
            <div className="flex gap-4">
              <p className="text-gray-500">id : {text} </p>
              <p className="text-gray-500">타입 : {type} </p>
              <p className="text-gray-500">등록 룸 수 : {room}</p>
            </div>
            <div className="flex gap-2">
              <button
                text="삭제"
                className="p-2 px-3 bg-red-100 rounded text-red-500 text-sm font-bold"
                onClick={deleteBtn}
              >
                {" "}
                삭제
              </button>
              {btn && (
                <>
                  <Link
                    className="p-2 bg-gray-500 rounded text-white text-sm font-bold"
                    to={`roomregister/${id}`}
                  >
                    {" "}
                    + 룸 등록{" "}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default AccommodationItem;
