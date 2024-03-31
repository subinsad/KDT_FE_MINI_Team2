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
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowSearchBar(prevScrollPos > currentScrollPos); // 스크롤 방향에 따라 SearchBar 보이기/숨기기 결정
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "http://15.164.19.60:8080/public-api/v1/accommodation";

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

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Filter accommodations based on price
        const filteredData = data.data.filter(
          (item) =>
            item.price >= filters.minPrice &&
            (item.price <= filters.maxPrice || filters.maxPrice === 500000) // If maxPrice is 500000, consider all prices
        );

        setFilteredAccommodation(filteredData);
        setTotalResults(filteredData.length);
        setTotalPages(Math.ceil(filteredData.length / 10));
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const { selectedType, selectedLocation } = newFilters;
    navigate(`/list/${selectedType}/${selectedLocation}`);
  };

  const handleLocationSearch = (location) => {
    setFilters({ ...filters, selectedLocation: location });
    navigate(`/list/${filters.selectedType}/${location}`);
  };

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
