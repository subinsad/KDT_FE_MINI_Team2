import React from 'react';
import axios from 'axios';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

function RoomItem({
    title,
    text,
    room,
    type,
    onClick,
    btn,
    id,
    setAccommodations,
    cookies,
}) {
    // 삭제
    const deleteBtn = async () => {
        console.log(id);
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
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <ul>
            <li className="flex justify-evenly items-end pt-4 pb-4 ">
                <div onClick={onClick} className="hover:cursor-pointer">
                    <p className="text-xl font-bold"> {title} </p>
                    <div className="flex items-center gap-4">
                        <p className="text-gray-500"> id : {text} </p>
                        <p className="text-gray-500"> 숙소유형 : {type} </p>
                        <p className="text-gray-500"> 등록된 갯수 : {room} </p>
                        <button
                            text="삭제"
                            className="p-2 px-3 bg-red-100 rounded text-red-500 text-sm font-bold"
                            onClick={deleteBtn}>
                            {' '}
                            삭제
                        </button>
                    </div>
                </div>

                {btn && (
                    <>
                        <Link
                            className="p-2 bg-gray-500 rounded text-white text-sm font-bold"
                            to={`roomregister/${id}`}>
                            {' '}
                            + 룸 등록{' '}
                        </Link>
                    </>
                )}
            </li>
        </ul>
    );
}

export default RoomItem;
