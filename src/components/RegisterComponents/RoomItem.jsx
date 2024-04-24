import React, { useState } from 'react';
import axios from 'axios';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

function RoomItem({
    title,
    text,
    fixedMember,
    maxedMember,
    btn,
    id,
    setAccommodations,
    cookies,
    roomImage,
}) {
    const [isDeleted, setIsDeleted] = useState(false);
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

            setIsDeleted(true);
            console.log(isDeleted);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return isDeleted ? null : (
        <ul>
            <li className="flex gap-6  items-center pt-4 pb-4 ">
                {roomImage && roomImage.length > 0 ? (
                    <img
                        src={roomImage}
                        alt="숙소이미지"
                        className=" w-20 h-20 bg-slate-300 rounded-xl"
                    />
                ) : (
                    <p className="w-20 h-20 bg-slate-300 rounded-xl flex justify-center items-center text-xs">
                        이미지가 <br /> 없습니다
                    </p>
                )}
                <div className="flex flex-col gap-3">
                    <p className="text-xl font-bold"> {title} </p>
                    <div className="flex items-center gap-8 w-full">
                        <p className="text-gray-500">
                            설명 :
                            {text.length > 7
                                ? `${text.substring(0, 7)}...`
                                : text}
                        </p>

                        <p className="text-gray-500">
                            기본인원 : {fixedMember}
                        </p>
                        <p className="text-gray-500">최대인원 :{maxedMember}</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default RoomItem;
