import React, { useEffect, useState } from "react";
import ListItem from "../components/NoticeComponents/ListItem";
import useStore from "../store/notice";
import Pagination from "../components/Pagination";
import TItle from "../components/Common/Title";
import Button from "../components/Common/Button";
import { Link } from "react-router-dom";

function Notice() {
  const { notice, ajax } = useStore();

  const [page, setPage] = useState(1); // 페이지
  const limit = 7; // 페이지당 최대 보여줄 아이템 수
  const offset = (page - 1) * limit; // 페이지네이션을 위한 offset

  useEffect(() => {
    ajax();
  }, []);

  // 현재 페이지에 맞게 공지사항을 자릅니다.
  const currentNotice = notice.slice(offset, offset + limit);

  return (
    <div className="max-w-mw mx-auto px-4 py-12">
      <div className="flex flex-col medium:flex-row medium:justify-between">
        <div>
          <TItle tag="h2" text="공지사항" className="mb-2" />
          <p className="mb-8 text-gray-500">
            업데이트 정보 등 다양한 소식을 알려드립니다.
          </p>
        </div>
        <Link to={"/edit"}>
          <Button text="새 글 등록" />
        </Link>
      </div>
      <ul>
        {currentNotice.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            text={item.text}
            date={item.date}
            link={`/notice/${item.id}`}
          />
        ))}
      </ul>
      <Pagination
        limit={limit}
        page={page}
        totalPosts={notice.length}
        setPage={setPage}
      />
    </div>
  );
}

export default Notice;
