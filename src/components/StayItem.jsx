import React from 'react';

function StayItem({ category, stayTitle, position, star }) {
    return (
        <div className="flex flex-col w-72">
            <div className="flex justify-between text-sm ">
                <span className="text-gray-600"> {category}</span>
                <span>★{star} </span>
            </div>

            <span className="text-lg font-semibold"> {stayTitle}</span>
            <span className="text-gray-600 text-sm">{position}</span>
        </div>
    );
}

export default StayItem;
