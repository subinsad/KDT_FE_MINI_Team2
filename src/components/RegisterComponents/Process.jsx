import React from 'react';
import Step from './step';

function Process({ labelArray, updateStep, currentStep }) {
    console.log(currentStep);
    return (
        <div className="flex gap-8  ">
            {labelArray.map((item, index) => (
                <Step
                    key={index}
                    index={index}
                    label={item}
                    updateStep={updateStep}
                    selected={currentStep >= index + 1}
                />
            ))}
        </div>
    );
}

export default Process;
