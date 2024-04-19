import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Button from '../Common/Button';

export default function CartEmpty() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl py-8 font-bold">내 장바구니</h2>
            <AiOutlineShoppingCart className="text-7xl text-gray-300 mb-4" />
            <div className="text-center">
                <p className="text-xl mb-1">장바구니에 담긴 상품이 없습니다</p>
                <p className="text-gray-600 mb-5">원하는 상품을 담아보세요</p>
                <Button text="홈으로 가기" className="w-full" />
            </div>
        </div>
    );
}
