import React, { useEffect } from 'react';
import TItle from '../Common/Title';
import StayItem from '../StayItem';
import PriceBlock from '../PriceBlock';
import StayCategory from './StayCategory';

import useStore from '../../store/accomodation';
import { useState } from 'react';
import Category from '../Common/Category';

function StayList1() {
    const { accomodation, ajax } = useStore(); // accomodation 상태와 ajax 함수 가져오기
    const [filterItem, setFilterItem] = useState(accomodation); // 초기값은 'all'

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax();
        setFilterItem(accomodation);
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    const handleBtn = (category) => {
        if (category === 'all') {
            setFilterItem(accomodation);
        } else {
            const filterItem = accomodation.filter(
                (item) => item.cartegory === category
            );
            setFilterItem(filterItem);
        }
        console.log(category);
    };

    return (
        <div className="flex flex-col gap-4">
            <TItle tag="h2" text="인기 숙소" />
            <div className="flex gap-2">
                <Category
                    text="전체"
                    value="all"
                    onClick={() => handleBtn('all')}
                />
                <Category
                    text="모텔"
                    value="motel"
                    onClick={() => handleBtn('모텔')}
                />
                <Category
                    text="호텔"
                    value="hotel"
                    onClick={() => handleBtn('호텔')}
                />
                <Category
                    text="리조트"
                    value="resort"
                    onClick={() => handleBtn('리조트')}
                />
                <Category
                    text="펜션"
                    value="pension"
                    onClick={() => handleBtn('펜션')}
                />
                <Category
                    text="캠핑"
                    value="camping"
                    onClick={() => handleBtn('캠핑')}
                />
                <Category
                    text="게스트하우스"
                    value="guestHouse"
                    onClick={() => handleBtn('게스트하우스')}
                />
            </div>

            <ul className="flex gap-4 ">
                <div className="flex gap-3 w-fit">
                    {filterItem.map((item, index) => (
                        <li key={index} value={item.cartegory}>
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
