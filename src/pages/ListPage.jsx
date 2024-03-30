import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TItle from "../components/Common/Title";
import Filter from "../components/ListComponents/Filter";
import SearchedStayList from "../components/ListComponents/SearchedStayList";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Common/Spinner";

export default function ListPage() {
  const navigate = useNavigate();
  const { type, location } = useParams();

  let newtype, newlocation;

  const [filters, setFilters] = useState({
    selectedType: type || "ALLTYPE",
    selectedLocation: location || "ALLLOCATION",
    minPrice: 0,
    maxPrice: 500000,
  });
  const [filteredAccommodation, setFilteredAccommodation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://15.164.19.60:8080/public-api/v1/accommodation";

        if (type && location) {
          newtype = type;
          newlocation = location;
          url += `/type/${newtype}/location/${newlocation}`;
        } else if (location === undefined) {
          if (
            ![
              "MOTEL",
              "HOTEL",
              "RESORT",
              "PENSION",
              "CAMPING",
              "GUESTHOUSE",
            ].includes(type)
          ) {
            newtype = "ALLTYPE";
            newlocation = type;
            url += `/location/${newlocation}`;
            setFilters({
              selectedType: "ALLTYPE",
              selectedLocation: newlocation,
            });
          } else {
            newtype = type;
            newlocation = "ALLLOCATION";
            url += `/type/${newtype}`;
            setFilters({
              selectedType: newtype,
              selectedLocation: "ALLLOCATION",
            });
          }
        } else {
          newtype = "ALLTYPE";
          newlocation = location;
          url += `/type/${newtype}/location/${newlocation}`;
          setFilters({ selectedType: newtype, selectedLocation: newlocation });
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFilteredAccommodation(data.data);
        setTotalResults(data.data.length);
        setTotalPages(Math.ceil(data.data.length / 10));
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, location]);

  useEffect(() => {
    console.log("Filters:", filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLocationSearch = (location) => {
    setFilters({ ...filters, selectedLocation: location });
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white">
        <SearchBar onSearch={handleLocationSearch} />
      </div>
      <div className="container flex gap-10 max-w-mw mx-auto mb-32 mt-24">
        <Filter
          type={filters.selectedType}
          location={filters.selectedLocation}
          onApplyFilter={handleFilterChange}
        />
        <div className="content flex flex-col gap-6 grow">
          <TItle
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
