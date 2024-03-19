import React from 'react';
import Badge from './Common/Badge';

export default function PriceBlock({
    fixedPrice,
    discountPrice,
    text,
    ...props
}) {
    return (
        <div className="w-fit flex flex-col items-center">
            <div className="flex gap-1 mb-1  items-center">
                <Badge text={text} className="bg-red-100 text-red-600 ">
                    {text}
                </Badge>
                <del className=" text-sm text-gray-600 ">{fixedPrice}</del>
            </div>

            <span className="text-xl font-bold">{discountPrice} </span>
        </div>
    );
}
