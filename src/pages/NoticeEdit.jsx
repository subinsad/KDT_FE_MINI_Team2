import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";
import ReactQuill from "react-quill";
import { GrLinkPrevious } from "react-icons/gr";
import { useCookies } from "react-cookie";

function NoticeEdit() {
  const [cookies] = useCookies(["secretKey"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  // 스마트에디터 설정 모듈
  const modules = {
    toolbar: {
      container: [
        // ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
    },
  };
  // 스마트에디터 설정 모듈

  // 수정할 공지사항 정보 불러오기
  const fetchData = async () => {
    try {
      if (id) {
        const response = await fetch(
          "http://15.164.19.60:8081/public-api/v1/board"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const selectedItem = data.data.boards.find(
          (item) => item.id === parseInt(id)
        );
        setTitle(selectedItem.title);
        setContent(selectedItem.content);
        setDate(selectedItem.updateDate); // 기존 날짜 데이터 설정
      } else {
        // 새로운 공지 등록 시 현재 날짜 설정
        const currentDate = new Date().toLocaleDateString();
        setDate(currentDate);
      }
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  // 수정할 공지사항 정보 불러오기

  // 공지 등록, 수정 기능
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedNotice = {
      title: title,
      content: content,
      date: date, // 기존 날짜 데이터 유지
    };

    const action = id ? "수정" : "등록";
    if (window.confirm(`정말로 이 공지를 ${action}하시겠습니까?`)) {
      try {
        // const method = id ? "PUT" : "POST"; // id가 있는 경우 PUT, 없는 경우 POST 사용
        const url = id
          ? `/api/v1/board/update/${id}`
          : "/api/v1/board/register";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.secretKey}`,
          },
          body: JSON.stringify(updatedNotice),
        });

        if (response.ok) {
          const responseData = await response.json(); // 등록 혹은 수정된 공지사항 데이터를 받아옴
          console.log(responseData.data);
          const newId = responseData.data.id; // 새로운 공지사항의 ID를 가져옴
          navigate(`/notice/${newId}`); // 수정 또는 등록 완료 후 상세 페이지로 이동
          console.log(`공지사항이 성공적으로 ${action}되었습니다.`);
        } else {
          console.error(`공지사항 ${id ? "수정" : "등록"}에 실패했습니다.`);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
  };
  // 공지 등록, 수정 기능

  const handleBack = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className="max-w-mw mx-auto px-4 py-12">
      <GrLinkPrevious onClick={handleBack} className="cursor-pointer mb-4" />
      <p className="text-lg font-semibold mb-4">
        {id ? "공지 수정" : "새 글 등록"}
      </p>
      <form className="flex flex-col w-full gap-4" onSubmit={handleUpdate}>
        <div className="flex flex-col w-full">
          <Input
            type="text"
            text="제목"
            placeholder="제목 입력"
            name="title"
            value={title} // 제목 입력 필드에 기존 제목 표시
            onChange={(e) => setTitle(e.target.value)} // 제목이 변경될 때 상태 업데이트
          />
        </div>
        <ReactQuill
          style={{ height: "600px" }}
          modules={modules}
          value={content} // 내용 입력 필드에 기존 내용 표시
          onChange={setContent} // 내용이 변경될 때 상태 업데이트
        />
        <Button
          className={`bg-gray-900 text-white mt-10 w-full `}
          text={"확인"}
          type="submit" // 폼 제출 버튼
        />
      </form>
    </div>
  );
}

export default NoticeEdit;
