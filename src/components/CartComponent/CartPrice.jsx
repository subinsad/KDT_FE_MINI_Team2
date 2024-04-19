import React from "react";
import Button from "../Common/Button";
import axios from "axios";
import useCartStore from "../../store/cart";
import { useNavigate } from "react-router";

export default function CartPrice({ carts, cookies }) {
  const navigate = useNavigate();
  const { fetchCartCount } = useCartStore();

  // 총 가격 계산
  const totalPrice = carts.reduce((sum, cart) => sum + cart.price, 0);

  // 할인 금액 계산
  const discountAmount = carts.reduce((sum, cart) => {
    return sum + cart.price * (cart.discount / 100);
  }, 0);

  // 총 가격에서 할인 금액을 빼서 최종 금액 계산
  const finalPrice = totalPrice - discountAmount;

  // 가격 표시 형식 설정
  const formattedTotalPrice = totalPrice.toLocaleString();
  const formattedDiscountAmount = discountAmount.toLocaleString();
  const formattedFinalPrice = finalPrice.toLocaleString();

  const handleReservation = async () => {
    try {
      const baskIds = carts.map((cart) => cart.id); // 장바구니 아이템 ID 추출
      const response = await axios.post(
        "/api/v1/reservation/basket",
        { baskIds: baskIds },
        { headers: { Authorization: `Bearer ${cookies.secretKey}` } }
      );
      console.log("Reservation successful", response.data);
      fetchCartCount(cookies.secretKey); // 카트 카운트 업데이트
      navigate("/cartcomplete", { state: { reservationData: response.data } });
    } catch (error) {
      console.error("Reservation failed:", error);
      alert("예약 실패");
    }
  };

  return (
    <div className="py-5 my-10">
      <p className="text-2xl font-bold mb-8">예약 상품</p>
      <div className="flex justify-between mb-5">
        <p className="text-xl">상품 금액</p>
        <p className="text-xl">{formattedTotalPrice}원</p>
      </div>

      <div className="flex justify-between mb-8">
        <p className="text-xl">할인 금액</p>
        <p className="text-xl">-{formattedDiscountAmount}원</p>
      </div>

      <div className="py-8 flex justify-between items-center border-dashed border-t-2 border-gray-300">
        <p className="text-xl">결제 예상 금액</p>
        <p className="text-3xl font-bold">{formattedFinalPrice}원</p>
      </div>
      <Button
        text="예약하기"
        onClick={handleReservation}
        className="w-full text-lg"
      />
    </div>
  );
}
