import React from "react";
import Button from "../Common/Button";

export default function CartPrice() {
  return (
    <div className="py-5 my-10">
      <p className="text-2xl font-bold mb-8">예약 상품</p>
      <div className="flex justify-between mb-5">
        <p className="text-xl">상품 금액</p>
        <p className="text-xl">상품 금액</p>
      </div>

      <div className="flex justify-between mb-8">
        <p className="text-xl">할인 금액</p>
        <p className="text-xl">-할인 금액</p>
      </div>

      <div className="py-8 flex justify-between items-center border-dashed border-t-2 border-gray-300">
        <p className="text-xl">결제 예상 금액</p>
        <p className="text-3xl font-bold">결제 금액</p>
      </div>
      <Button text="예약하기" className="w-full text-lg" />
    </div>
  );
}
