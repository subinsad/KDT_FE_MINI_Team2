import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackBtn() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };
    return (
        <button
            onClick={goBack}
            text="이전"
            className="font-bold py-3 px-4 rounded bg-gray-300 text-gray-700">
            이전
        </button>
    );
}

export default BackBtn;
