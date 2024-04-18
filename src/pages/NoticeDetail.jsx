import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { useCookies } from "react-cookie";

function NoticeDetail() {
  const [cookies] = useCookies(["secretKey"]);
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate Hook을 사용하여 navigate 함수 가져오기
  const [noticeItem, setNoticeItem] = useState();

  // 공지상세 불러오기
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://15.164.19.60:8081/public-api/v1/board"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const selectedItem = data.data.find((item) => item.id === parseInt(id));
      setNoticeItem(selectedItem);
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  // 공지상세 불러오기

  const handleBack = () => {
    navigate("/notice"); // 뒤로가기
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // 수정 화면으로 이동
  };

  // 공지 삭제 기능
  const handleDelete = async () => {
    if (window.confirm("정말로 이 공지를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/v1/board/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.secretKey}`,
          },
        });
        if (response.ok) {
          navigate("/notice"); // 삭제 후 공지 목록 페이지로 이동
        } else {
          throw new Error("Failed to delete notice");
        }
      } catch (error) {
        console.error("Error deleting notice:", error);
      }
    }
  };
  // 공지 삭제 기능

  return (
    <div className="max-w-mw mx-auto px-4 py-12">
      <GrLinkPrevious onClick={handleBack} className="cursor-pointer mb-4" />
      {noticeItem && (
        <div className="flex flex-col gap-1 pb-4 mb-6 border-b-2 border-solid border-gray-300">
          <b className="text-lg font-semibold">{noticeItem.title}</b>
          <div className="flex gap-1">
            <span className="text-gray-500">{noticeItem.updateDate}</span>
            <span className="text-gray-300">|</span>
            <span
              className="text-gray-500 cursor-pointer hover:text-black"
              onClick={handleEdit}
            >
              수정
            </span>
            <span className="text-gray-300">|</span>
            <span
              className="text-gray-500 cursor-pointer hover:text-black"
              onClick={handleDelete}
            >
              삭제
            </span>
          </div>
        </div>
      )}
      <div>
        {noticeItem && (
          <div dangerouslySetInnerHTML={{ __html: noticeItem.content }} />
        )}
      </div>
    </div>
  );
}

export default NoticeDetail;
