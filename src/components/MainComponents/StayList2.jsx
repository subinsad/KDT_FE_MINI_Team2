import React, { useEffect } from 'react';
import TItle from '../Common/Title';
import StayItem from '../StayItem';
import PriceBlock from '../PriceBlock';

import useStore from '../../store/accomodation';
import { Link } from 'react-router-dom';

function StayList2() {
    const { data, ajax } = useStore();

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax();
    }, [ajax]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    return (
        <div>
            <TItle tag="h2" text="특가 숙소" className="mb-4" />
            <ul className="flex gap-4 ">
                <div className="flex gap-3 w-fit">
                    {data
                        ?.sort((a, b) => b.sale - a.sale)
                        .slice(0, 4)
                        .map((item, index) => (
                            <Link to={`/detail/${item.id}`} key={index}>
                                <img
                                    src="http://tong.visitkorea.or.kr/cms/resource/92/2626192_image2_1.jpg"
                                    alt="숙소이미지"
                                    className=" w-72 h-40 bg-slate-300 rounded"
                                />

                                <StayItem
                                    category={item.accommodationType}
                                    star={item.rate}
                                    stayTitle={item.accommodationName}
                                    position={item.locationType}
                                />
                                <PriceBlock
                                    // text={`-${item.sale}%`}
                                    fixedPrice={item.price}
                                    // discountRate={item.sale}
                                />
                            </Link>
                        ))}
                </div>
            </ul>
        </div>
    );
}

export default StayList2;
