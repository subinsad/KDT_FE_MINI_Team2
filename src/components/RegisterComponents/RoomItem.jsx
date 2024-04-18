// RoomItem.jsx

import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

function RoomItem({ title, text, room, type, onClick, btn, id }) {
    return (
        <ul>
            <li className="flex justify-between items-end pt-4 pb-4 ">
                <div onClick={onClick} className="hover:cursor-pointer">
                    <p className="text-xl font-bold mb-1"> {title} </p>
                    <div className="flex gap-4">
                        <p className="text-gray-500"> id : {text} </p>
                        <p className="text-gray-500"> 숙소유형 : {type} </p>
                        <p className="text-gray-500"> 등록된 갯수 : {room} </p>
                    </div>
                </div>

                {btn && (
                    <Link
                        className="p-2 bg-gray-500 rounded text-white text-sm font-bold"
                        to={`roomregister/${id}`}>
                        {' '}
                        + 룸 등록{' '}
                    </Link>
                )}
            </li>
        </ul>
    );
}

export default RoomItem;
