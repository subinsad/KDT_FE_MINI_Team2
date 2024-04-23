import React, { useEffect, useState } from "react";
import ListItem from "../components/NoticeComponents/ListItem";
import TItle from "../components/Common/Title";
import Button from "../components/Common/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoticeSkeleton from "../components/NoticeComponents/NoticeSkeleton";
import Pagination from "../components/Pagination";

function Notice() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const page = queryParams.get("page") || "1";
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // 공지사항 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://15.164.19.60:8081/public-api/v1/board?page=${
            currentPage - 1
          }&size=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTotalResults(data.data.boardCount);
        setNotice(data.data.boards);
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);
  // 공지사항 불러오기

  // 페이지네이션 기능
  useEffect(() => {
    const totalPages = Math.ceil(totalResults / 5);
    setTotalPages(totalPages);
  }, [totalResults]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/notice?page=${pageNumber}&size=5`, { replace: true });
  };
  // 페이지네이션 기능

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

      {loading ? (
        <NoticeSkeleton />
      ) : (
        <>
          {notice && notice.length > 0 ? (
            <ul>
              {notice.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.title}
                  text={item.text}
                  date={item.updateDate}
                  link={`/notice/${item.id}`}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center font-bold">등록된 공지사항이 없습니다.</p>
          )}
        </>
      )}
      <Pagination
        totalPosts={totalResults}
        limit={5}
        page={parseInt(currentPage)}
        setPage={goToPage}
      />
    </div>
  );
}

export default Notice;
