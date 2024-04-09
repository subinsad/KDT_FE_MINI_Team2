import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useStore from "../store/notice";
import { GrLinkPrevious } from "react-icons/gr";

function NoticeDetail() {
  const { id } = useParams();
  const { notice, ajax } = useStore();
  const noticeItem = notice.find((item) => item.id === id);

  useEffect(() => {
    ajax();
  }, []);

  const title = noticeItem?.title || "";
  const date = noticeItem?.date || "";
  const text = noticeItem?.text || "";

  const handlBack = () => {
    window.history.go(-1);
  };

  return (
    <div className="max-w-mw mx-auto pt-12 pb-12">
      <GrLinkPrevious onClick={handlBack} className="cursor-pointer mb-4" />
      <div className="flex flex-col gap-1 pb-4 mb-6 border-b-2 border-solid border-gray-300">
        <b className="text-lg font-semibold"> {title}</b>
        <div className="flex gap-1">
          <span className="text-gray-500"> {date}</span>
          <span className="text-gray-300">|</span>
          <Link to={"/edit"}>
            <span className="text-gray-500 cursor-pointer hover:text-black">
              수정
            </span>
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 cursor-pointer hover:text-black">
            삭제
          </span>
        </div>
      </div>

      <div className="h-[400px]">
        {text.split("\n").map((line, index) => (
          <span key={index} className="text-gray-600 leading-10">
            {line}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

export default NoticeDetail;
