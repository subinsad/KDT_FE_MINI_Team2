import React, { useState } from 'react';
import Process from '../components/RegisterComponents/Process';
import Step1 from '../components/RegisterComponents/Step1';
import Step2 from '../components/RegisterComponents/Step2';
import Step3 from '../components/RegisterComponents/Step3';
import Step4 from '../components/RegisterComponents/Step4';
import Step5 from '../components/RegisterComponents/Step5';
import Button from '../components/Common/Button';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Register() {
    const [currentStep, updateCurrentStep] = useState(1);
    const labelArray = ['숙소 등록', '객실등록', '완료'];
    const [isLoading, setIsLoading] = useState(false);
    const [cookies] = useCookies(['secretKey']);

    const steps = [Step1, Step2, Step3, Step4, Step5];
    const CurrentStepComponent = steps[currentStep - 1];

    function updateStep(step) {
        updateCurrentStep(step);
    }

    const handleSubmit = async (value) => {
        try {
            value.accommodationImage.forEach((image, index) => {
                formData.append(`accommodationImage[${index}]`, image);
            });
            const response = await axios.post(
                '/api/v1/accommodation/admin',
                {
                    accommodationName: value.accommodationName,
                    accommodationType: value.accommodationType,
                    introduction: value.introduction,
                    address: value.address,
                    locationName: value.locationName,
                    discountRate: value.discountRate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.secretKey}`,
                    },
                }
            );

            console.log(value.accommodationName);

            console.log(response);
            updateStep(currentStep + 1); // API 호출이 성공하면 다음 단계로 이동
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 max-w-mw mx-auto pt-16 pb-16">
            <Process
                labelArray={labelArray}
                updateStep={updateStep}
                currentStep={currentStep}
            />
            <CurrentStepComponent onSubmit={handleSubmit} />

            <div className="flex gap-12">
                <button
                    text="이전"
                    className="font-bold py-3 px-4 rounded bg-gray-300 text-gray-700"
                    onClick={() => updateStep(currentStep - 1)}
                    disabled={currentStep === 1}>
                    이전
                </button>
                <Button
                    text="다음"
                    onClick={() => updateStep(currentStep + 1)}
                    disabled={currentStep === 5}
                    onSubmit={handleSubmit}>
                    다음
                </Button>
            </div>
        </div>
    );
}

export default Register;
