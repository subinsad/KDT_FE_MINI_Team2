import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

function AccommodationItem({
    title,
    text,
    room,
    type,
    onClick,
    btn,
    id,
    setAccommodations,
    cookies,
    fetchAccommodation,
}) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [detail, setDetail] = useState(false);
    const detailRef = useRef(null);

    // 클릭 박스
    const clickBox = () => {
        setDetail(!detail);
    };

    // 클릭된 위치가 상세 정보 바깥쪽인지 확인하는 함수
    const handleClickOutside = (event) => {
        if (detailRef.current && !detailRef.current.contains(event.target)) {
            setDetail(false); // 상세 정보를 닫음
        }
    };

    useEffect(() => {
        // 페이지가 로드될 때마다 클릭된 위치를 감지하여 상세 정보를 닫음
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 삭제
    const deleteBtn = async () => {
        try {
            const response = await axios.delete(
                `/api/v1/accommodation/${id}/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.secretKey}`,
                    },
                }
            );
            const responseData = response.data;
            // 숙소 정보 업데이트
            setAccommodations(responseData.data || []);
            fetchAccommodation();
            setIsDeleted(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 삭제 확인
    const confirmDelete = () => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete) {
            deleteBtn();
        }
    };

    return isDeleted ? null : (
        <ul>
            <li className="gap-4 pt-4 pb-4 medium:pt-5 medium:pb-5">
                <div
                    onClick={onClick}
                    className="flex flex-col gap-4 hover:cursor-pointer medium:gap-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-bold"> {title} </p>
                        <div className="flex flex-col items-end relative">
                            <IoIosMore
                                onClick={clickBox}
                                className="cursor-pointer"
                            />
                            {detail && (
                                <div
                                    ref={detailRef}
                                    className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-1">
                                        <li>
                                            <button
                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={confirmDelete}>
                                                삭제
                                            </button>
                                        </li>
                                        <li>
                                            <Link
                                                to={`roomregister/${id}`}
                                                className="block w-full px-4 py-2 text-sm text-center text-gray-700  hover:bg-gray-100">
                                                + 룸 등록
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 medium:flex-row medium:items-center medium:justify-between">
                        <div className="flex gap-4">
                            <p className="text-gray-500">id : {text} </p>
                            <p className="text-gray-500">타입 : {type} </p>
                            <p className="text-gray-500">등록 룸 수 : {room}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default AccommodationItem;
