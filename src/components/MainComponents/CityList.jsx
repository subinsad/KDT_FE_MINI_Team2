import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TItle from '../Common/Title';

import useStore from '../../store/accomodation';
import city1 from '../../img/city1.png';
import city2 from '../../img/city2.png';
import city3 from '../../img/city3.png';
import city4 from '../../img/city4.png';
import city5 from '../../img/city5.png';
import city6 from '../../img/city6.png';

function CityList() {
    const { data, ajax } = useStore(); // accomodation 상태와 ajax 함수 가져오기

    useEffect(() => {
        // 페이지가 로드될 때 데이터 가져오기
        ajax();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출되도록 함

    // 데이터가 로드되었는지 확인 후 jejuItem 찾기
    const jejuItem = data && data.find((item) => item.locationType === 'JEJU');
    // jejuItem이 존재하는 경우에만 jejuLink 설정
    const jejuLink = jejuItem ? jejuItem.locationType : null;

    //서울
    const seoulItem =
        data && data.find((item) => item.locationType === 'SEOUL');
    const seoulLink = seoulItem ? seoulItem.locationType : null;

    //부산
    const busanItem =
        data && data.find((item) => item.locationType === 'BUSAN');
    const busanLink = busanItem ? busanItem.locationType : null;

    //강릉
    const gangneungItem =
        data && data.find((item) => item.locationType === 'GANGNEUNG');
    const gangneungLink = gangneungItem ? gangneungItem.locationType : null;

    // 인천
    const incheonItem =
        data && data.find((item) => item.locationType === 'INCHEON');
    const incheonLink = incheonItem ? incheonItem.locationType : null;

    // 경주
    const gyeongjuItem =
        data && data.find((item) => item.locationType === 'GYEONGJU');
    const gyeongjuLink = gyeongjuItem ? gyeongjuItem.locationType : null;

    return (
        <div>
            <TItle tag="h2" text="인기 여행지" className="mb-4" />

            <div className="flex justify-between">
                <Link to={`/list/${jejuLink}`} className="flex flex-col gap-2">
                    <img
                        src={city1}
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 ">제주</span>
                </Link>

                <Link to={`/list/${seoulLink}`} className="flex flex-col gap-2">
                    <img
                        src={city2}
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 서울</span>
                </Link>

                <Link to={`/list/${busanLink}`} className="flex flex-col gap-2">
                    <img
                        src={city3}
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 부산</span>
                </Link>

                <Link
                    to={`/list/${gangneungLink}`}
                    className="flex flex-col gap-2">
                    <img
                        src={city4}
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 "> 강릉</span>
                </Link>

                <Link
                    to={`/list/${incheonLink}`}
                    className="flex flex-col gap-2">
                    <img
                        src={city5}
                        alt="이미지"
                        className=" w-44 h-44 bg-slate-300 rounded"
                    />
                    <span className="text-sm text-gray-800 ">인천</span>
                </Link>

                <Link
                    to={`/list/${gyeongjuLink}`}
                    className="flex flex-col gap-2">
                    <img
                        src={city6}
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
