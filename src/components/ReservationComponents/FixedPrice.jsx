import React from "react";

export default function FixedPrice({ fixedPrice, discountRate }) {
  const discountedPrice = fixedPrice - (fixedPrice * discountRate) / 100;
  const formattedDiscountedPrice = discountedPrice.toLocaleString();
  return (
    <p className="text-2xl font-bold text-center mb-6">
      총 결제 금액 : {formattedDiscountedPrice} 원
    </p>
  );
}
