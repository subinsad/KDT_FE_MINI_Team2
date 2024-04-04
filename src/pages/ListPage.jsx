// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Title from "../components/Common/Title";
// import Filter from "../components/ListComponents/Filter";
// import SearchedStayList from "../components/ListComponents/SearchedStayList";
// import SearchBar from "../components/SearchBar";
// import Spinner from "../components/Common/Spinner";
// import ListSkeleton from "../components/ListComponents/ListSkeleton";

// export default function ListPage() {
//   const navigate = useNavigate();
//   const { type, location, startDate, endDate, personal } = useParams();

//   const [filters, setFilters] = useState({
//     selectedType: type,
//     selectedLocation: location,
//     minPrice: 0,
//     maxPrice: 500000,
//   });
//   const [filteredAccommodation, setFilteredAccommodation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [showSearchBar, setShowSearchBar] = useState(true);

//   useEffect(() => {
//     let prevScrollPos = window.pageYOffset; // 이전 스크롤 위치를 저장하기 위한 변수

//     // 스크롤 이벤트 핸들러 등록
//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset; // 현재 스크롤 위치
//       // 스크롤 방향에 따라 검색 바를 보여줄지 결정
//       setShowSearchBar(prevScrollPos > currentScrollPos);
//       prevScrollPos = currentScrollPos; // 이전 스크롤 위치를 현재 스크롤 위치로 업데이트
//     };

//     window.addEventListener("scroll", handleScroll); // 스크롤 이벤트에 핸들러 등록

//     // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       let url = `http://15.164.19.60:8081/public-api/v1/accommodation?checkIn=${startDate}&checkOut=${endDate}&location_type=${filters.selectedLocation}&accommodation_type=${filters.selectedType}&personal=${personal}`;
//       // 필터 조건에 따라 URL 생성
//       // if (
//       //   filters.selectedType !== "전체타입" &&
//       //   filters.selectedLocation !== "전체"
//       // ) {
//       //   url += `/type/${filters.selectedType}/location/${filters.selectedLocation}`;
//       // } else if (
//       //   filters.selectedType === "전체타입" &&
//       //   filters.selectedLocation !== "전체"
//       // ) {
//       //   url += `/location/${filters.selectedLocation}`;
//       // } else if (
//       //   filters.selectedType !== "전체타입" &&
//       //   filters.selectedLocation === "전체"
//       // ) {
//       //   url += `/type/${filters.selectedType}`;
//       // }

//       // 데이터 가져오기
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();

//       const { accommodationCount } = data.data;
//       setTotalResults(accommodationCount);

//       // 가격에 따라 숙소 필터링
//       const filteredData = data.data.result.filter(
//         (item) =>
//           item.price >= filters.minPrice &&
//           (item.price <= filters.maxPrice || filters.maxPrice === 500000)
//       );

//       // 필터된 숙소 목록 및 페이징 관련 상태 업데이트
//       setFilteredAccommodation(filteredData);
//       setCurrentPage(1);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filters]); // filters 상태가 변경될 때마다 실행됨

//   // 필터 변경 핸들러
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     const { selectedType, selectedLocation } = newFilters;
//     navigate(
//       `/list/${startDate}/${endDate}/${selectedLocation}/${selectedType}/${personal}`
//     );
//   };

//   // 위치 검색 핸들러
//   const handleLocationSearch = (location) => {
//     setFilters({ ...filters, selectedLocation: location });
//     handleFilterChange({ ...filters, selectedLocation: location });
//   };

//   useEffect(() => {
//     const totalPages = Math.ceil(totalResults / 4); // 한 페이지에 보여줄 리스트 개수가 4개일 때의 예시
//     setTotalPages(totalPages);
//   }, [totalResults]);

//   const goToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <div
//         className={`flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white transition-all duration-300 ${
//           showSearchBar ? "" : "transform -translate-y-full"
//         }`}
//       >
//         <SearchBar onSearch={handleLocationSearch} />
//       </div>

//       <div className="container flex gap-10 max-w-mw mx-auto mb-32 mt-24">
//         <Filter
//           type={filters.selectedType}
//           location={filters.selectedLocation}
//           onApplyFilter={handleFilterChange}
//         />
//         <div className="content flex flex-col gap-6 grow">
//           <Title
//             className="searchResult"
//             tag="h2"
//             text={`'${filters.selectedLocation}' 지역의 숙소 ${totalResults}개`}
//           />
//           {loading ? (
//             <ListSkeleton />
//           ) : (
//             <>
//               <SearchedStayList accomodation={filteredAccommodation} />
//               <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index}
//                     className={index + 1 === currentPage ? "active" : ""}
//                     onClick={() => goToPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Title from "../components/Common/Title";
// import Filter from "../components/ListComponents/Filter";
// import SearchedStayList from "../components/ListComponents/SearchedStayList";
// import SearchBar from "../components/SearchBar";
// import Spinner from "../components/Common/Spinner";
// import ListSkeleton from "../components/ListComponents/ListSkeleton";

// export default function ListPage() {
//   const navigate = useNavigate();
//   const { type, location, startDate, endDate, personal, page } = useParams();

//   const [filters, setFilters] = useState({
//     selectedType: type,
//     selectedLocation: location,
//     minPrice: 0,
//     maxPrice: 500000,
//   });
//   const [filteredAccommodation, setFilteredAccommodation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(page);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [showSearchBar, setShowSearchBar] = useState(true);

//   useEffect(() => {
//     let prevScrollPos = window.pageYOffset;

//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
//       setShowSearchBar(prevScrollPos > currentScrollPos);
//       prevScrollPos = currentScrollPos;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         let url = `http://15.164.19.60:8081/public-api/v1/accommodation?checkIn=${startDate}&checkOut=${endDate}&location_type=${
//           filters.selectedLocation
//         }&accommodation_type=${
//           filters.selectedType
//         }&personal=${personal}&page=${currentPage - 1}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();

//         const { accommodationCount } = data.data;
//         setTotalResults(accommodationCount);

//         const filteredData = data.data.result.filter(
//           (item) =>
//             item.price >= filters.minPrice &&
//             (item.price <= filters.maxPrice || filters.maxPrice === 500000)
//         );

//         setFilteredAccommodation(filteredData);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filters, currentPage]); // filters 및 currentPage 상태가 변경될 때마다 실행됨

//   useEffect(() => {
//     const totalPages = Math.ceil(totalResults / 4); // 한 페이지에 보여줄 리스트 개수가 4개일 때의 예시
//     setTotalPages(totalPages);
//   }, [totalResults]);

//   const goToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     const { selectedType, selectedLocation } = newFilters;
//     navigate(
//       `/list/${startDate}/${endDate}/${selectedLocation}/${selectedType}/${personal}/${page}`
//     );
//   };

//   const handleLocationSearch = (location) => {
//     setFilters({ ...filters, selectedLocation: location });
//     setCurrentPage(1); // 검색을 할 때마다 currentPage를 1로 초기화
//     handleFilterChange({ ...filters, selectedLocation: location });
//   };

//   return (
//     <>
//       <div
//         className={`flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white transition-all duration-300 ${
//           showSearchBar ? "" : "transform -translate-y-full"
//         }`}
//       >
//         <SearchBar onSearch={handleLocationSearch} />
//       </div>

//       <div className="container flex gap-10 max-w-mw mx-auto mb-32 mt-24">
//         <Filter
//           type={filters.selectedType}
//           location={filters.selectedLocation}
//           onApplyFilter={handleFilterChange}
//         />
//         <div className="content flex flex-col gap-6 grow">
//           <Title
//             className="searchResult"
//             tag="h2"
//             text={`'${filters.selectedLocation}' 지역의 ${filters.selectedType} ${totalResults}개`}
//           />
//           {loading ? (
//             <ListSkeleton />
//           ) : (
//             <>
//               <SearchedStayList
//                 accomodation={filteredAccommodation}
//                 startDate={startDate}
//                 endDate={endDate}
//                 personal={personal}
//               />
//               <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index}
//                     className={index + 1 === currentPage ? "active" : ""}
//                     onClick={() => goToPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Common/Title';
import Filter from '../components/ListComponents/Filter';
import SearchedStayList from '../components/ListComponents/SearchedStayList';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Common/Spinner';
import ListSkeleton from '../components/ListComponents/ListSkeleton';
import Pagination from '../components/Pagination';

export default function ListPage() {
    const navigate = useNavigate();
    const { type, location, startDate, endDate, personal, page } = useParams();

    const [filters, setFilters] = useState({
        selectedType: type,
        selectedLocation: location,
        minPrice: 0,
        maxPrice: 500000,
    });
    const [filteredAccommodation, setFilteredAccommodation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [showSearchBar, setShowSearchBar] = useState(true);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setShowSearchBar(prevScrollPos > currentScrollPos);
            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://15.164.19.60:8081/public-api/v1/accommodation?checkIn=${startDate}&checkOut=${endDate}&location_type=${
                    filters.selectedLocation
                }&accommodation_type=${
                    filters.selectedType
                }&personal=${personal}&page=${currentPage - 1}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                const { accommodationCount } = data.data;
                setTotalResults(accommodationCount);

                const filteredData = data.data.result.filter(
                    (item) =>
                        item.price >= filters.minPrice &&
                        (item.price <= filters.maxPrice ||
                            filters.maxPrice === 500000)
                );

                setFilteredAccommodation(filteredData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters, currentPage]);

    useEffect(() => {
        const totalPages = Math.ceil(totalResults / 4);
        setTotalPages(totalPages);
    }, [totalResults]);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(
            `/list/${startDate}/${endDate}/${location}/${type}/${personal}/${pageNumber}`
        ); // 수정된 부분: 페이지 이동 시 URL 업데이트
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        const { selectedType, selectedLocation } = newFilters;
        setCurrentPage(1);
        navigate(
            `/list/${startDate}/${endDate}/${selectedLocation}/${selectedType}/${personal}/1` // 수정된 부분: 필터 변경 시 첫 번째 페이지로 이동
        );
    };

    const handleLocationSearch = (location) => {
        setFilters({ ...filters, selectedLocation: location });
        setCurrentPage(1);
        navigate(
            `/list/${startDate}/${endDate}/${location}/${type}/${personal}/1` // 수정된 부분: 검색 시 첫 번째 페이지로 이동
        );
    };

    return (
        <>
            <div
                className={`flex justify-center border-b-2 border-gray-200 border-solid sticky top-[82px] bg-white transition-all duration-300 ${
                    showSearchBar ? '' : 'transform -translate-y-full'
                }`}>
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
                        text={`'${filters.selectedLocation}' 지역의 ${filters.selectedType} ${totalResults}개`}
                    />
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
                            <Pagination
                                totalPosts={totalResults}
                                limit={4}
                                page={parseInt(currentPage)} // 수정된 부분: currentPage를 숫자로 변환하여 전달
                                setPage={goToPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
