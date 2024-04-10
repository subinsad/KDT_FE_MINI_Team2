import React from "react";
import Title from "../components/Common/Title";
import Input from "../components/Form/Input";
import Button from "../components/Common/Button";

function NoticeEdit() {
  return (
    <div className="max-w-mw mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-16 ">
        <Title tag="h2" className=" w-full" text="글 작성" />
        <form className="flex flex-col w-full">
          <div className="flex flex-col w-full mb-6">
            <Input type="text" text="제목" placeholder="제목 입력" />
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
