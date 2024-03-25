import React from 'react';
import TItle from '../Common/Title';
import StayItem from '../StayItem';
import PriceBlock from '../PriceBlock';

import useStore from '../../store/accomodation';

function StayList3() {
    const { accomodation } = useStore();

    const pickItem = accomodation.sort(() => Math.random() - 0.5);

    return (
        <div>
            <TItle tag="h2" text="에디터 픽" className="mb-4" />
            <ul className="flex gap-4 ">
                <div className="flex gap-3 w-fit">
                    {pickItem.slice(0, 4).map((item, index) => (
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
                                text={`-${item.sale}%`}
                                fixedPrice={item.price}
                                discountRate={item.sale}
                            />
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default StayList3;
