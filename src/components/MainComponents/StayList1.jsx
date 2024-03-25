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
    const [filterItem, setFilterItem] = useState([]); // 초기값은 빈배열

    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax().then((data) => {
            setFilterItem(data);
        });
    }, [ajax]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    const itemsToDisplay = filterItem || accomodation || []; //둘중하나를 사용

    const btnItem = [...new Set(accomodation?.map((item) => item.cartegory))]; //버튼 카테고리

    const handleBtn = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setFilterItem(accomodation);
        } else {
            const filteredItems = accomodation.filter(
                (item) => item.cartegory === category
            );
            setFilterItem(filteredItems);
        }
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
                {btnItem.map((category, index) => (
                    <Category
                        key={index}
                        text={category}
                        value={category}
                        onClick={() => handleBtn(category)}
                        isSelected={selectedCategory === category}
                    />
                ))}
            </div>

            <ul className="flex gap-4">
                <div className="flex gap-3 w-fit">
                    {itemsToDisplay
                        ?.sort((a, b) => b.star - a.star)
                        .slice(0, 4)
                        .map((item, index) => (
                            <li key={index} value={item.cartegory}>
                                <img
                                    src="../img/Frame4.png"
                                    alt="숙소이미지"
                                    className="w-72 h-40 bg-slate-300 rounded"
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
