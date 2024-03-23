import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TItle from '../Common/Title';

import useStore from '../../store/accomodation';

function CityList() {
    const { accomodation, ajax } = useStore(); // accomodation 상태와 ajax 함수 가져오기
    // 인천일경우 가져옴,
    const IncheonItem = accomodation.filter(
        (item) => item.location_id.location_name === '인천'
    );

    // accomodation.forEach((item) => {
    //     switch (item.location_id.location_name) {
    //         case '제주':
    //             console.log('제주에 해당하는 항목:', item);

    //         case '서울':
    //             console.log('서울에 해당하는 항목:', item);
    //             break;
    //         case '부산':
    //             console.log('부산에 해당하는 항목:', item);
    //             break;
    //         case '강릉':
    //             console.log('강릉에 해당하는 항목:', item);
    //             break;
    //         case '인천':
    //             console.log('인천에 해당하는 항목:', item);
    //             break;
    //         case '경주':
    //             console.log('경주에 해당하는 항목:', item);
    //             break;
    //         default:
    //             break;
    //     }
    // });

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    return (
        <div>
            <TItle tag="h2" text="인기 여행지" className="mb-4" />

            <div className="flex justify-between">
                <Link to="" className="flex flex-col gap-2">
                    <img
                        src="../img/city1.png"
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 제주</span>
                </Link>

                <Link to="" className="flex flex-col gap-2">
                    <img
                        src="../img/city1.png"
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 서울</span>
                </Link>

                <Link to="" className="flex flex-col gap-2">
                    <img
                        src="../img/city1.png"
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 부산</span>
                </Link>

                <Link to="" className="flex flex-col gap-2">
                    <img
                        src="../img/city1.png"
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 강릉</span>
                </Link>

                <Link to="" className="flex flex-col gap-2">
                    <img
                        src="../img/city1.png"
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 ">
                        {' '}
                        {IncheonItem.accomodation_name} 인천
                    </span>
                </Link>

                <Link to="" className="flex flex-col gap-2">
                    <img
                        src="../img/city1.png"
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 경주</span>
                </Link>
            </div>
        </div>
    );
}

export default CityList;
