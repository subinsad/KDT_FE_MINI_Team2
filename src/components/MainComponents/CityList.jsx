import React from 'react';
import { Link } from 'react-router-dom';
import TItle from '../Common/Title';

import city1 from '../../img/city1.png';
import city2 from '../../img/city2.png';
import city3 from '../../img/city3.png';
import city4 from '../../img/city4.png';
import city5 from '../../img/city5.png';
import city6 from '../../img/city6.png';

import { getCurrentDate } from '../../data/date';

function CityList() {
    const cities = ['제주', '서울', '부산', '인천', '강릉', '경주'];

    const cityImg = {
        제주: city1,
        서울: city2,
        부산: city3,
        인천: city4,
        강릉: city5,
        경주: city6,
    };

    const currentDate = getCurrentDate();

    return (
        <div>
            <TItle tag="h2" text="인기 여행지" className="mb-4" />
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                {cities.map((city, index) => (
                    <Link
                        key={index}
                        to={`/list/${currentDate}/${currentDate}/${encodeURIComponent(
                            city
                        )}/호텔/2`}
                        className="flex flex-col w-full h-40">
                        <div className="rounded-xl aspect-square overflow-hidden w-full">
                            <img
                                src={cityImg[city]}
                                alt={`${city} 이미지`}
                                className="w-full h-full transition-transform duration-300 transform hover:scale-110"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <span className="text-sm text-gray-800">{city}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CityList;
