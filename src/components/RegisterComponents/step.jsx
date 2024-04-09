import React from 'react';

function Step({ label, index, updateStep, selected, currentStep }) {
    return (
        <div
            className={
                'stepBlock flex items-center gap-2 font-bold' +
                (selected ? 'selected' : '')
            }>
            <div
                className={`flex justify-center items-center circleWrapper
                            border border-solid w-8 h-8 
                            rounded-full  ${
                                selected
                                    ? 'bg-blue-500 border-primary  text-white'
                                    : 'bg-white border-gray-500  text-gray-500'
                            }`}
                onClick={() => updateStep(index + 1)}>
                {index + 1}
            </div>
            <div className=""> </div>
            <span
                className={` ${selected ? 'text-primary' : ' text-gray-500'}`}>
                {label}
            </span>
        </div>
    );
}

export default Step;
