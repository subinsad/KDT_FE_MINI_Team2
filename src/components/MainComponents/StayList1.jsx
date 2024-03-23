import React, { useEffect } from 'react';
import TItle from '../Common/Title';
import StayItem from '../StayItem';
import PriceBlock from '../PriceBlock';
import StayCategory from './StayCategory';

import useStore from '../../store/accomodation';

function StayList1() {
    const { accomodation, ajax } = useStore(); // accomodation 상태와 ajax 함수 가져오기

    const hotelItems = accomodation.filter((item) => item.cartegory === '호텔');

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    return (
        <div className="flex flex-col gap-4">
            <TItle tag="h2" text="인기 숙소" />
            <StayCategory value="" />
            <ul className="flex gap-4 ">
                <div className="flex gap-3 w-fit">
                    {hotelItems.map((item, index) => (
                        <li key={index}>
                            <img
                                src="../img/Frame4.png"
                                alt="숙소이미지"
                                className=" w-72 h-40 bg-slate-300 rounded"
                            />

                            <StayItem
                                category={item.cartegory}
                                star={item.star}
                                stayTitle={item.accomodation_name}
                                position={item.location_id.location_name}
                            />
                            <PriceBlock
                                text="-50%"
                                fixedPrice={item.price}
                                discountPrice="1,000,000원"
                            />
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default StayList1;
