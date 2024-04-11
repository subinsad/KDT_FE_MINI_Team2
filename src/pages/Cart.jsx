import React, { useState } from "react";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import CartPrice from "../components/CartComponent/CartPrice";
import { IoClose } from "react-icons/io5";

export default function Cart() {
  const [isChecked, setIsChecked] = useState(true);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="max-w-mw mx-auto p-8">
      <h2 className="text-center text-2xl p-8 font-bold">내 장바구니</h2>

      <div className="border-solid border-b-2 border-gray-300 py-8 flex relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleClick}
          className="w-6 h-6 mr-3"
        ></input>
        <ReservationItem className="border-solid border-t-2 border-gray-300" />
        <button className="absolute right-0">
          <IoClose className="text-3xl text-gray-400" />
        </button>
      </div>

      <CartPrice />
    </div>
  );
}
