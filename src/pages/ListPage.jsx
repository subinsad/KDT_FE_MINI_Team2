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
  const [page, setPage] = useState(1);
  const [endOfData, setEndOfData] = useState(false);
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

    setFilteredAccomodation(filteredList.slice(0, page * 10));
    setTotalResults(filteredList.length);
  }, [accomodation, filters, page]);
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        endOfData
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, endOfData]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setEndOfData(false);
  };

  const handleLocationSearch = (location) => {
    setFilters({ ...filters, selectedLocation: location });
    setPage(1);
    setEndOfData(false);
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
          />{" "}
          <SearchedStayList accomodation={filteredAccomodation} />
          {loading && <Spinner />}
        </div>
      </div>
    </>
  );
}
