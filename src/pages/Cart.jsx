import React, { useState, useEffect } from "react";
import axios from "axios";
import ReservationItem from "../components/ReservationComponents/ReservationItem";
import CartPrice from "../components/CartComponent/CartPrice";
import CartEmpty from "../components/CartComponent/CartEmpty";
import { useCookies } from "react-cookie";
import Button from "../components/Common/Button";
import useCartStore from "../store/cart";

export default function Cart() {
  const [isChecked, setIsChecked] = useState(true); // 처음부터 모든 체크박스를 활성화
  const [carts, setCarts] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [cookies] = useCookies(["secretKey"]);
  const { fetchCartCount } = useCartStore();

  useEffect(() => {
    if (cookies.secretKey) {
      fetchCartCount(cookies.secretKey);
    }
  }, [cookies.secretKey, fetchCartCount]);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get("/api/v1/basket/all", {
        headers: {
          Authorization: `Bearer ${cookies.secretKey}`,
        },
      });
      if (response.data.data) {
        const newCarts = response.data.data;
        console.log(newCarts);
        setCarts(newCarts);
        // 모든 아이템의 ID를 체크 상태로 설정
        setCheckedItems(newCarts.map((item) => item.id));
        // 모든 아이템이 로드될 때 전체 선택 체크박스를 활성화
        setIsChecked(newCarts.length > 0);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleCheckChange = (id) => {
    const currentIndex = checkedItems.indexOf(id);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(id);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }
    setCheckedItems(newCheckedItems);
    setIsChecked(newCheckedItems.length === carts.length);
  };

  const toggleCheckAll = () => {
    if (isChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(carts.map((item) => item.id));
    }
    setIsChecked(!isChecked);
  };

  const handleRemove = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: "/api/v1/basket/delete/detail",
        data: { baskIds: checkedItems },
        headers: { Authorization: `Bearer ${cookies.secretKey}` },
      });

      if (response.status === 200) {
        console.log("Items successfully deleted");
        fetchCarts(); // 다시 아이템 로드
        fetchCartCount(cookies.secretKey); // 카트 카운트 업데이트
      }
    } catch (err) {
      console.error("Failed to delete items:", err);
      alert("아이템 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-mw mx-auto p-8">
      {carts.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <h2 className="text-center text-2xl p-8 font-bold">내 장바구니</h2>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckAll}
                id="subscribe"
                className="w-6 h-6"
              />
              <label htmlFor="subscribe">전체 선택</label>
            </div>
            <Button text="선택 삭제" onClick={handleRemove} />
          </div>

          {carts.map((cart) => (
            <div
              key={cart.id}
              className="border-solid border-b-2 border-gray-300 py-8 flex relative"
            >
              <input
                type="checkbox"
                checked={checkedItems.includes(cart.id)}
                onChange={() => handleCheckChange(cart.id)}
                className="w-6 h-6 mr-3"
              ></input>
              <ReservationItem
                className="flex-grow"
                clickedRoom={cart}
                detailItem={cart}
                checkIn={cart.checkIn}
                checkOut={cart.checkOut}
              />
            </div>
          ))}
          <CartPrice
            carts={carts.filter((cart) => checkedItems.includes(cart.id))}
            cookies={cookies}
          />
        </>
      )}
    </div>
  );
}
