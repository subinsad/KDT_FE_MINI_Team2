import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartStatus({ cartCount }) {
  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-3xl" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-[7px] py-[2px] rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
}
