import React from 'react';
import TItle from '../Common/Title';
import StayItem from '../StayItem';
import PriceBlock from '../PriceBlock';

function StayList3() {
    return (
        <div>
            <TItle tag="h2" text="에디터 픽" className="mb-4" />
            <div className="flex gap-4 ">
                <div className="flex flex-col gap-3 w-fit">
                    <img
                        src="../img/Frame4.png"
                        alt="숙소이미지"
                        className=" w-72 h-40 bg-slate-300 rounded"
                    />

                    <StayItem
                        category="숙소 종류"
                        star="10.0"
                        stayTitle="숙소 이름"
                        position="위치"
                    />
                    <PriceBlock
                        text="-50%"
                        fixedPrice="2,000,000원"
                        discountPrice="1,000,000원"
                    />
                </div>
                <div className="flex flex-col gap-3 w-fit">
                    <img
                        src="../img/Frame4.png"
                        alt="숙소이미지"
                        className=" w-72 h-40 bg-slate-300 rounded"
                    />

                    <StayItem
                        category="숙소 종류"
                        star="10.0"
                        stayTitle="숙소 이름"
                        position="위치"
                    />
                    <PriceBlock
                        text="-50%"
                        fixedPrice="2,000,000원"
                        discountPrice="1,000,000원"
                    />
                </div>
                <div className="flex flex-col gap-3 w-fit">
                    <img
                        src="../img/Frame4.png"
                        alt="숙소이미지"
                        className=" w-72 h-40 bg-slate-300 rounded"
                    />

                    <StayItem
                        category="숙소 종류"
                        star="10.0"
                        stayTitle="숙소 이름"
                        position="위치"
                    />
                    <PriceBlock
                        text="-50%"
                        fixedPrice="2,000,000원"
                        discountPrice="1,000,000원"
                    />
                </div>
                <div className="flex flex-col gap-3 w-fit">
                    <img
                        src="../img/Frame4.png"
                        alt="숙소이미지"
                        className=" w-72 h-40 bg-slate-300 rounded"
                    />

                    <StayItem
                        category="숙소 종류"
                        star="10.0"
                        stayTitle="숙소 이름"
                        position="위치"
                    />
                    <PriceBlock
                        text="-50%"
                        fixedPrice="2,000,000원"
                        discountPrice="1,000,000원"
                    />
                </div>
            </div>
        </div>
    );
}

export default StayList3;
