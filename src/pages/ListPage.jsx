import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Common/Title";
import Filter from "../components/ListComponents/Filter";
import SearchedStayList from "../components/ListComponents/SearchedStayList";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Common/Spinner";

export default function ListPage() {
  const navigate = useNavigate();
  const { type, location } = useParams();

  const [filters, setFilters] = useState({
    selectedType: type,
    selectedLocation: location,
    minPrice: 0,
    maxPrice: 500000,
  });
  const [filteredAccommodation, setFilteredAccommodation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset; // 이전 스크롤 위치를 저장하기 위한 변수

    // 스크롤 이벤트 핸들러 등록
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset; // 현재 스크롤 위치
      // 스크롤 방향에 따라 검색 바를 보여줄지 결정
      setShowSearchBar(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos; // 이전 스크롤 위치를 현재 스크롤 위치로 업데이트
    };

    window.addEventListener("scroll", handleScroll); // 스크롤 이벤트에 핸들러 등록

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "http://15.164.19.60:8080/public-api/v1/accommodation";

        // 필터 조건에 따라 URL 생성
        if (
          filters.selectedType !== "ALLTYPE" &&
          filters.selectedLocation !== "ALLLOCATION"
        ) {
          url += `/type/${filters.selectedType}/location/${filters.selectedLocation}`;
        } else if (
          filters.selectedType === "ALLTYPE" &&
          filters.selectedLocation !== "ALLLOCATION"
        ) {
          url += `/location/${filters.selectedLocation}`;
        } else if (
          filters.selectedType !== "ALLTYPE" &&
          filters.selectedLocation === "ALLLOCATION"
        ) {
          url += `/type/${filters.selectedType}`;
        }

        // 데이터 가져오기
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // 가격에 따라 숙소 필터링
        const filteredData = data.data.filter(
          (item) =>
            item.price >= filters.minPrice &&
            (item.price <= filters.maxPrice || filters.maxPrice === 500000)
        );

        // 필터된 숙소 목록 및 페이징 관련 상태 업데이트
        setFilteredAccommodation(filteredData);
        setTotalResults(filteredData.length);
        setTotalPages(Math.ceil(filteredData.length / 10));
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]); // filters 상태가 변경될 때마다 실행됨

  // 필터 변경 핸들러
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const { selectedType, selectedLocation } = newFilters;
    navigate(`/list/${selectedType}/${selectedLocation}`);
  };

  // 위치 검색 핸들러
  const handleLocationSearch = (location) => {
    setFilters({ ...filters, selectedLocation: location });
    handleFilterChange({ ...filters, selectedLocation: location });
    navigate(`/list/ALLTYPE/${encodeURIComponent(location)}`);
  };

  // 페이지 이동 핸들러
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        className={`flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white transition-all duration-300 ${
          showSearchBar ? "" : "transform -translate-y-full"
        }`}
      >
        <SearchBar onSearch={handleLocationSearch} />
      </div>

      <div className="container flex gap-10 max-w-mw mx-auto mb-32 mt-24">
        <Filter
          type={filters.selectedType}
          location={filters.selectedLocation}
          onApplyFilter={handleFilterChange}
        />
        <div className="content flex flex-col gap-6 grow">
          <Title
            className="searchResult"
            tag="h2"
            text={`'${filters.selectedLocation}' 지역의 숙소 ${totalResults}개`}
          />
          <SearchedStayList accomodation={filteredAccommodation} />
          {loading && <Spinner />}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={index + 1 === currentPage ? "active" : ""}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
