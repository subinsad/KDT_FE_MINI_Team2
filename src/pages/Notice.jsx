import React, { useEffect, useState } from "react";
import ListItem from "../components/NoticeComponents/ListItem";
import useStore from "../store/notice";
import Pagination from "../components/Pagination";
import TItle from "../components/Common/Title";
import Button from "../components/Common/Button";
import { Link } from "react-router-dom";

function Notice() {
  const [page, setPage] = useState(1); // 페이지
  const [notice, setNotice] = useState([]);

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:3000/notice");
      const response = await fetch(
        "http://15.164.19.60:8081/public-api/v1/board"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setNotice(data.data);
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {notice.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            text={item.text}
            date={item.date}
            link={`/notice/${item.id}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notice;
