import React from "react";
import Title from "../components/Common/Title";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";

function NoticeEdit() {
  const createNotice = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");

    // 새로운 공지사항 생성
    const newNotice = {
      title: title,
      date: new Date().toLocaleDateString(), // 현재 날짜로 설정
      text: "", // 내용은 비워둠
    };

    try {
      // 새로운 공지사항을 서버에 POST 요청으로 전송
      const response = await fetch("http://localhost:5174/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotice),
      });

      if (response.ok) {
        console.log("새로운 공지사항이 성공적으로 등록되었습니다.");
      } else {
        console.error("새로운 공지사항 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  return (
    <div className="max-w-mw mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-16 ">
        <Title tag="h2" className=" w-full" text="글 작성" />
        <form className="flex flex-col w-full" onSubmit={createNotice}>
          <div className="flex flex-col w-full mb-6">
            <Input
              type="text"
              text="제목"
              placeholder="제목 입력"
              name="title"
            />
          </div>

          <Button
            className={`bg-gray-900 text-white mt-10 w-full `}
            text={"확인"}
          />
        </form>
      </div>
    </div>
  );
}

export default NoticeEdit;
