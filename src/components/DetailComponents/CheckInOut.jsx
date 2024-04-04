import React from 'react';

export default function CheckInOut({
    stayTitle,
    checkIn,
    checkOut,
    startDate,
    endDate,
}) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-72 my-7">
                <span className="text-lg font-semibold"> {stayTitle}</span>
            </div>
            <span className="text-gray-500 text-sm">
                {startDate} ~ {endDate} | 1박
            </span>
            <span className="text-gray-400 text-sm"> {checkIn}</span>
            <span className="text-gray-400 text-sm">{checkOut}</span>
        </div>
    );
}
