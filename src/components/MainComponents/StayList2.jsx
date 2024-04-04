import React, { useEffect } from 'react';
import TItle from '../Common/Title';
import StayItem from '../StayItem';
import PriceBlock from '../PriceBlock';

import useStore from '../../store/accomodation';
import { Link } from 'react-router-dom';
import { getCurrentDate, getTomorrowDate } from '../../data/date';

function StayList2() {
    const { data, ajax } = useStore();

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax();
    }, [ajax]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    //날짜
    const currentDate = getCurrentDate();
    const tomorrowDate = getTomorrowDate();

    return (
        <div>
            <TItle tag="h2" text="특가 숙소" className="mb-4" />
            <ul className="flex gap-4 overflow-x-scroll touch-pan-x md:overflow-auto">
                <div className="flex gap-3 w-fit">
                    {data
                        ?.sort((a, b) => b.discount - a.discount)
                        .slice(0, 4)
                        .map((item, index) => (
                            <Link
                                to={`/detail/${item.id}/${currentDate}/${tomorrowDate}/2`}
                                key={index}
                                value={item.accommodationType}
                                className="rounded-xl border-transparent border-solid border hover:border-gray-300">
                                {item.accommodationImage &&
                                item.accommodationImage.length > 0 ? (
                                    <img
                                        src={
                                            item.accommodationImage[0].imagePath
                                        }
                                        alt="숙소이미지"
                                        className="w-72 h-40 bg-slate-300 rounded-xl"
                                    />
                                ) : (
                                    // 기본 이미지 또는 이미지가 없는 경우에 대한 처리
                                    <img
                                        src="/path/to/default/image"
                                        alt="기본 이미지"
                                        className="w-72 h-40 bg-slate-300 rounded-xl"
                                    />
                                )}
                                <StayItem
                                    category={item.accommodationType}
                                    star={item.rate}
                                    stayTitle={item.accommodationName}
                                    position={item.locationType}
                                />
                                <PriceBlock
                                    text={`-${item.discount}%`}
                                    fixedPrice={item.price}
                                    discountRate={item.discount}
                                />
                            </Link>
                        ))}
                </div>
            </ul>
        </div>
    );
}

export default StayList2;
