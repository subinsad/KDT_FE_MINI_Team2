import React from "react";
import Badge from "./Common/Badge";

export default function PriceBlock({
  fixedPrice,
  text,
  discountRate,
  ...props
}) {
  const discountedPrice = fixedPrice - (fixedPrice * discountRate) / 100;
  const formattedFixedPrice = fixedPrice.toLocaleString();
  const formattedDiscountedPrice = discountedPrice.toLocaleString();

  return (
    <div className="w-fit flex flex-col items-center">
      <div className="flex gap-1 mb-1 items-center">
        <Badge text={text} className="bg-red-100 text-red-600">
          {text}
        </Badge>
        <del className="text-sm text-gray-600">{formattedFixedPrice}원</del>
      </div>

      <span className="text-xl font-bold">{formattedDiscountedPrice}원</span>
    </div>
  );
}
