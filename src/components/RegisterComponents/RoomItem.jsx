// RoomItem.jsx
import React from 'react';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function RoomItem({ title, text, room, type, onClick, btn }) {
    return (
        <ul>
            <li className="flex justify-between items-center pt-4 pb-4 ">
                <div>
                    <p className="text-xl font-bold mb-1"> {title} </p>
                    <div className="flex gap-4">
                        <p className="text-gray-500"> id : {text} </p>
                        <p className="text-gray-500"> 숙소유형 : {type} </p>
                        <p className="text-gray-500"> 등록된 갯수 : {room} </p>
                    </div>
                </div>

                {btn && (
                    <button onClick={onClick} className="text-2xl">
                        <GrFormNext />
                    </button>
                )}
            </li>
        </ul>
    );
}

export default RoomItem;
