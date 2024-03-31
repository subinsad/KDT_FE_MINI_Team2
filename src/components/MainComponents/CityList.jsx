import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TItle from "../Common/Title";

import useStore from "../../store/accomodation";
import city1 from "../../img/city1.png";
import city2 from "../../img/city2.png";
import city3 from "../../img/city3.png";
import city4 from "../../img/city4.png";
import city5 from "../../img/city5.png";
import city6 from "../../img/city6.png";

function CityList() {
  const { data, ajax } = useStore(); // accomodation 상태와 ajax 함수 가져오기

  useEffect(() => {
    // 페이지가 로드될 때 데이터 가져오기
    ajax();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

  const cities = ["JEJU", "SEOUL", "BUSAN", "GANGNEUNG", "INCHEON", "GYEONGJU"];

  const cityLinks = cities.map((city) => {
    const cityItem = data && data.find((item) => item.locationType === city);
    const cityLink = cityItem ? cityItem.locationType : null;
    return cityLink;
  });

  const cityImg = {
    JEJU: city1,
    SEOUL: city2,
    BUSAN: city3,
    GANGNEUNG: city4,
    INCHEON: city5,
    GYEONGJU: city6,
  };

  return (
    <div>
      <TItle tag="h2" text="인기 여행지" className="mb-4" />

      <div className="flex justify-between">
        {cities.map((city, index) => (
          <Link
            key={index}
            to={`/list/ALLTYPE/${cityLinks[index]}`}
            className="flex flex-col gap-2"
          >
            <img
              src={cityImg[city]}
              alt={`${city} 이미지`}
              className=" w-44 h-44 bg-slate-300 rounded"
            />
            <span className="text-sm text-gray-800 ">{city}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CityList;
