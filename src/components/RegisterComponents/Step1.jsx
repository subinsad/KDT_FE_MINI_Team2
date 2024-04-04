import React, { useState, useRef } from 'react';
import Title from '../Common/Title';
import Input from '../Form/Input';

function Step1({ onSubmit }) {
    const [inputValue, setInputValue] = useState({
        accommodationName: '',
        accommodationType: '',
        address: '',
        locationName: '',
        discountRate: '',
        accommodationImage: null, // 파일을 선택하기 전에는 null로 초기화
    });

    const fileInputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // onSubmit 함수를 호출하여 부모 컴포넌트로 데이터를 전달합니다.
        onSubmit(inputValue); // inputValue를 전달합니다.
        console.log(inputValue);
    };

    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0];
        setInputValue({
            ...inputValue,
            accommodationImage: file,
        });
    };

    return (
        <form
            className="max-w-mw mx-auto w-2/4 flex flex-col gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
            <div>
                <h3 className="pb-2 font-bold text-lg">숙소등록하기</h3>
                <p> 등록할 숙소정보를 입력해주세요 </p>
            </div>

            <div className="flex gap-3">
                <div className="w-9/12">
                    <Input
                        className="w-full"
                        value={inputValue.accommodationName}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                accommodationName: e.target.value,
                            });
                        }}
                        type="text"
                        text="숙소이름"
                        placeholder="숙소이름 입력"
                    />
                </div>

                <div className="w-3/12">
                    <Input
                        className="w-full"
                        value={inputValue.accommodationType}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                accommodationType: e.target.value,
                            });
                        }}
                        type="text"
                        text="숙소 유형"
                        placeholder="숙소유형 입력"
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-9/12">
                    <Input
                        className="w-full"
                        value={inputValue.address}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                address: e.target.value,
                            });
                        }}
                        type="text"
                        text="주소"
                        placeholder="주소 입력"
                    />
                </div>

                <div className="w-3/12">
                    <Input
                        className="w-full"
                        value={inputValue.locationName}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                locationName: e.target.value,
                            });
                        }}
                        type="text"
                        text="지역"
                        placeholder="지역 입력"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="w-9/12">
                    <input
                        ref={fileInputRef}
                        type="file"
                        text="사진"
                        placeholder="사진 등록"
                        onChange={handleFileInputChange}
                    />
                </div>

                <div className="w-3/12">
                    <Input
                        className="w-full"
                        value={inputValue.discountRate}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                discountRate: e.target.value,
                            });
                        }}
                        type="text"
                        text="할인율"
                        placeholder="할인율 입력"
                    />
                </div>
            </div>
            <button type="submit"> 전송 </button>
        </form>
    );
}

export default Step1;
