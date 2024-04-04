import React from 'react';

export default function MapNavi({ moveBtn, bottomBtn }) {
    return (
        <div className="mb-3 pb-3 border-gray-200 border-solid border-b-2">
            <button
                className="mr-2 px-5 bg-white text-black "
                onClick={moveBtn}>
                객실
            </button>
            <button
                className="px-5 bg-white text-stone-400 hover:text-black"
                onClick={bottomBtn}>
                위치
            </button>
        </div>
    );
}
