import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Title from "../components/Common/Title";
import Filter from "../components/ListComponents/Filter";
import SearchedStayList from "../components/ListComponents/SearchedStayList";
import SearchBar from "../components/SearchBar";
import ListSkeleton from "../components/ListComponents/ListSkeleton";
import NumberPagination from "../components/NumberPagination";

export default function ListPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const location = queryParams.get("location");
  const startDate = queryParams.get("checkIn");
  const endDate = queryParams.get("checkOut");
  const personal = queryParams.get("personal");
  const page = queryParams.get("page") || "1";

  const [filters, setFilters] = useState({
    selectedType: type,
    selectedLocation: location,
    minPrice: 0,
    maxPrice: 500000,
  });
  const [filteredAccommodation, setFilteredAccommodation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalResults, setTotalResults] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // 스크롤 여부에 따른 검색바 노출기능
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
  // 스크롤 여부에 따른 검색바 노출기능

  // 리스트 기능
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `http://15.164.19.60:8081/public-api/v1/accommodation?checkIn=${startDate}&checkOut=${endDate}&location_type=${
          filters.selectedLocation
        }&accommodation_type=${
          filters.selectedType
        }&personal=${personal}&page=${currentPage - 1}`;

        // 데이터 가져오기
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const { accommodationCount } = data.data;
        setTotalResults(accommodationCount);

        // 가격에 따라 숙소 필터링
        const filteredData = data.data.result.filter(
          (item) =>
            item.price >= filters.minPrice &&
            (item.price <= filters.maxPrice || filters.maxPrice === 500000)
        );

        // 필터된 숙소 목록 및 페이징 관련 상태 업데이트
        setFilteredAccommodation(filteredData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage]);
  // 리스트 기능

  // 필터 변경 기능
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const { selectedType, selectedLocation } = newFilters;
    setCurrentPage(1);
    navigate(
      `/list?type=${selectedType}&location=${selectedLocation}&checkIn=${startDate}&checkOut=${endDate}&personal=${personal}&page=1`,
      { replace: true } // 이전 기록을 대체하여 히스토리에 쌓이지 않도록 함
    );
  };
  // 필터 변경 기능

  // 검색바 기능
  const handleLocationSearch = (location) => {
    setFilters({ ...filters, selectedLocation: location });
    setCurrentPage(1);
    navigate(
      `/list?type=${type}&location=${location}&checkIn=${startDate}&checkOut=${endDate}&personal=${personal}&page=1`,
      { replace: true } // 이전 기록을 대체하여 히스토리에 쌓이지 않도록 함
    );
  };
  // 검색바 기능

  // 필터 노출 토글 기능
  const showFiltersHandler = () => {
    setShowFilters(true);
  };

  const hideFiltersHandler = () => {
    setShowFilters(false);
  };
  // 필터 노출 토글 기능

  // 페이지네이션 기능
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(
      `/list?type=${type}&location=${location}&checkIn=${startDate}&checkOut=${endDate}&personal=${personal}&page=${pageNumber}`,
      { replace: true }
    );
  };
  // 페이지네이션 기능

  return (
    <>
      <div
        className={`flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white transition-all duration-300 ${
          showSearchBar ? "" : "transform -translate-y-full"
        }`}
      >
        <SearchBar onSearch={handleLocationSearch} />
      </div>
      <div className="container flex flex-col gap-10 max-w-mw mx-auto py-12 medium:flex-row">
        {showFilters && (
          <Filter
            type={filters.selectedType}
            location={filters.selectedLocation}
            onApplyFilter={handleFilterChange}
            hideFiltersHandler={hideFiltersHandler}
            className="fixed top-0 z-50"
          />
        )}
        <Filter
          type={filters.selectedType}
          location={filters.selectedLocation}
          onApplyFilter={handleFilterChange}
          hideFiltersHandler={hideFiltersHandler}
          className="hidden large:flex"
        />

        <div className="content flex flex-col gap-6 grow  px-4">
          <div className="flex justify-between items-center">
            <Title
              className="searchResult"
              tag="h2"
              text={`'${location}' 지역의 ${type} ${totalResults}개`}
            />
            <div onClick={showFiltersHandler} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 large:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
          </div>
          {loading ? (
            <ListSkeleton />
          ) : (
            <>
              <SearchedStayList
                accomodation={filteredAccommodation}
                startDate={startDate}
                endDate={endDate}
                personal={personal}
              />
              <NumberPagination
                totalPosts={totalResults}
                limit={4}
                page={parseInt(currentPage)}
                setPage={goToPage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
