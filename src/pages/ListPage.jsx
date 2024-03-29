import React, { useEffect, useState } from "react";
import TItle from "../components/Common/Title";
import Filter from "../components/ListComponents/Filter";
import SearchedStayList from "../components/ListComponents/SearchedStayList";
import useStore from "../store/accomodation";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Common/Spinner";

export default function ListPage() {
  const [filters, setFilters] = useState({
    selectedType: "전체유형",
    selectedLocation: "전체지역",
    minPrice: 0,
    maxPrice: 500000,
  });

  const [filteredAccomodation, setFilteredAccomodation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [totalResults, setTotalResults] = useState(0);
  const { ajax, accomodation } = useStore();

  useEffect(() => {
    ajax();
  }, []);

  useEffect(() => {
    const filteredList = accomodation.filter((item) => {
      if (!item || !item.location_id || !item.location_id.location_name)
        return false;

      const typeCondition =
        filters.selectedType === "전체유형" ||
        (item.category &&
          item.category.toLowerCase() === filters.selectedType.toLowerCase());
      const locationCondition =
        filters.selectedLocation === "전체지역" ||
        item.location_id.location_name.toLowerCase() ===
          filters.selectedLocation.toLowerCase();
      const priceCondition =
        parseInt(item.price) >= filters.minPrice &&
        (parseInt(item.price) <= filters.maxPrice ||
          filters.maxPrice === 500000);

      return typeCondition && locationCondition && priceCondition;
    });

    setTotalResults(filteredList.length);
    setTotalPages(Math.ceil(filteredList.length / 10)); // Calculate total pages
    setCurrentPage(1);
    setFilteredAccomodation(filteredList.slice(0, 10));
  }, [accomodation, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLocationSearch = (location) => {
    setFilters({ ...filters, selectedLocation: location });
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * 10;
    setFilteredAccomodation(
      accomodation
        .filter((item) => {
          if (!item || !item.location_id || !item.location_id.location_name)
            return false;

          const typeCondition =
            filters.selectedType === "전체유형" ||
            (item.category &&
              item.category.toLowerCase() ===
                filters.selectedType.toLowerCase());
          const locationCondition =
            filters.selectedLocation === "전체지역" ||
            item.location_id.location_name.toLowerCase() ===
              filters.selectedLocation.toLowerCase();
          const priceCondition =
            parseInt(item.price) >= filters.minPrice &&
            (parseInt(item.price) <= filters.maxPrice ||
              filters.maxPrice === 500000);

          return typeCondition && locationCondition && priceCondition;
        })
        .slice(startIndex, startIndex + 10)
    );
  };

  return (
    <>
      <div className="flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white">
        <SearchBar onSearch={handleLocationSearch} />
      </div>
      <div className="container flex gap-10 max-w-mw mx-auto mb-32 mt-24">
        <Filter onApplyFilter={handleFilterChange} />
        <div className="content flex flex-col gap-6 grow">
          <TItle
            className="searchResult"
            tag="h2"
            text={`'${filters.selectedLocation}' 지역의 숙소 ${totalResults}개`}
          />
          <SearchedStayList accomodation={filteredAccomodation} />
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
