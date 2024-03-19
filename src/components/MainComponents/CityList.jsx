import React from 'react';
import { Link } from 'react-router-dom';
import TItle from '../Common/Title';

function CityList() {
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
                    <span className="text-sm text-gray-800 "> 인천</span>
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
