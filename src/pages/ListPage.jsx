import React, { useState } from "react";
import TItle from "../components/Common/Title";
import StayItem from "../components/StayItem";
import PriceBlock from "../components/PriceBlock";
import Filter from "../components/ListComponents/Filter";
import SearchedStayList from "../components/ListComponents/SearchedStayList";

export default function ListPage() {
  const [filters, setFilters] = useState({
    selectedType: "allType",
    selectedLocation: "allLocation",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  console.log(filters.selectedType);
  console.log(filters.selectedLocation);
  return (
    <div className="container flex gap-10 max-w-mw mx-auto mb-32 mt-24">
      <Filter onFilterChange={handleFilterChange} />
      <div className="content flex flex-col gap-6 grow">
        <TItle
          className="searchResult"
          tag="h2"
          text="'제주도' 숙소 2,197개"
        ></TItle>
        <SearchedStayList />
      </div>
    </div>
  );
}
