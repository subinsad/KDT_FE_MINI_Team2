import React from "react";
import { Link, useParams } from "react-router-dom";
import StayItem from "../StayItem";
import PriceBlock from "../PriceBlock";

function SearchedStayList({ accomodation, startDate, endDate, personal }) {
  return (
    <>
      {accomodation.map((item, index) => (
        <Link
          to={`/detail/${item.id}/${startDate}/${endDate}/${personal}`}
          key={index}
        >
          <div className="stayItemBox flex gap-4 items-center">
            <div className="w-[33%] aspect-w-2 aspect-h-1 rounded-xl overflow-hidden medium:w-[50%] large:aspect-none large:w-[480px] large:h-[280px]">
              <img
                src={item.accommodationImage[0].imagePath}
                alt="숙소이미지"
                className="w-full h-full object-center object-cover -z-10 lg:w-full lg:h-full"
              />
            </div>
            <div className="w-[67%] stayDetail flex flex-col grow gap-8 items-end medium:w-[50%]">
              <StayItem
                category={item.accommodationType}
                star={item.rate}
                stayTitle={item.accommodationName}
                position={item.locationType}
                className="w-full"
              />
              <PriceBlock
                text={`-${item.discount}%`}
                fixedPrice={item.price}
                discountRate={item.discount}
              />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default SearchedStayList;
