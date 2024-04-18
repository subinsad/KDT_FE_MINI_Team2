import React, { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import Input from '../components/Form/Input';
import Button from '../components/Common/Button';
import axios from 'axios';
import BackBtn from '../components/Common/BackBtn';
import { useNavigate } from 'react-router';
import ImgInput from '../components/Common/ImgInput';

function Register() {
    const [cookies] = useCookies(['secretKey']);

    const [selectedFileName, setSelectedFileName] = useState('');
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        accommodationName: '',
        accommodationType: '',
        address: '',
        locationName: '',
        discountRate: '',
        introduction: '',
        accommodationImage: null, // 파일을 선택하기 전에는 null로 초기화
    });

    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = inputValue;

        try {
            const formData = new FormData();

            const jsonData = {
                accommodationName: value.accommodationName,
                accommodationType: value.accommodationType,
                address: value.address,
                locationName: value.locationName,
                discountRate: value.discountRate,
                introduction: value.introduction,
            };

            const blob = new Blob([JSON.stringify(jsonData)], {
                type: 'application/json',
            });
            formData.append('request', blob);
            formData.append('image', fileInputRef.current.files[0]);

            const response = await axios.post(
                '/api/v1/accommodation/admin',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.secretKey}`,
                        'Content-Type': 'multipart/form-data', // Content-Type 설정
                    },
                }
            );

            console.log('Response:', response.data); // 응답 출력

            navigate(-1);
        } catch (error) {
            console.error('에러 발생:', error); // 에러 메시지를 콘솔에 출력
        }
    };
    console.log('Authorization:', `Bearer ${cookies.secretKey}`);
    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            setInputValue({
                ...inputValue,
                accommodationImage: file,
            });
            setSelectedFileName(file.name);
        } else {
            console.error('선택된 파일이 없습니다.');
        }
    };

    return (
        <form
            className="meidum:max-w-mw mx-auto meidum:w-2/4 flex flex-col medium:gap-4 gap-3 pt-16 pb-16 w-10/12"
            onSubmit={handleSubmit}
            encType="multipart/form-data">
            <div>
                <h3 className="pb-2 font-bold text-lg">숙소등록하기</h3>
                <p> 등록할 숙소정보를 입력해주세요 </p>
            </div>

            <div className="meidum:flex medium:flex-row gap-3 flex flex-col">
                <div className="w-full mb-4">
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

                <div className="w-full ">
                    <p className="mb-1 font-light text-sm text-slate-600">
                        숙소유형 선택
                    </p>
                    <select
                        className="bg-gray-100 py-3 px-4 font-light rounded hover:bg-gray-200 w-full "
                        name="accommodationType"
                        value={inputValue.accommodationType}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                accommodationType: e.target.value,
                            });
                        }}>
                        <option value="호텔">호텔</option>
                        <option value="모텔">모텔</option>
                        <option value="펜션">펜션</option>
                        <option value="캠핑">캠핑</option>
                        <option value="리조트">리조트</option>
                        <option value="게스트하우스">게스트하우스</option>
                    </select>
                </div>
            </div>
            <div className="meidum:flex medium:flex-row gap-3 flex flex-col">
                <div className=" w-full mb-4">
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

                <div className="w-full">
                    <p className="mb-1 font-light text-sm text-slate-600">
                        지역 선택
                    </p>
                    <select
                        className="bg-gray-100 py-3 px-4 font-light rounded hover:bg-gray-200 w-full "
                        name="accommodationType"
                        value={inputValue.locationName}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                locationName: e.target.value,
                            });
                        }}>
                        <option value="제주">제주</option>
                        <option value="서울">서울</option>
                        <option value="부산">부산</option>
                        <option value="인천">인천</option>
                        <option value="강릉">강릉</option>
                        <option value="경주">경주</option>
                    </select>
                </div>
            </div>

            <div className="meidum:flex medium:flex-row gap-3 flex flex-col">
                <div className="w-full flex flex-col mb-4">
                    <p className="mb-1 font-light text-sm text-slate-600">
                        사진선택
                    </p>
                    <label className="flex items-center px-5 py-2 text-slate-500 bg-gray-100 cursor-pointer h-10">
                        <input
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }} // 파일 입력 필드를 숨깁니다.
                            onChange={handleFileInputChange}
                            className="bg-gray-100"
                        />

                        <span className="ml-2">
                            {selectedFileName ? (
                                <>{selectedFileName}</>
                            ) : (
                                <>선택된 파일이 없습니다.</>
                            )}
                        </span>
                    </label>
                </div>

                <div className="w-full">
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
            <div className="flex gap-3">
                <div className="w-full">
                    <Input
                        className="w-full"
                        value={inputValue.introduction}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                introduction: e.target.value,
                            });
                        }}
                        type="text"
                        text="소개"
                        placeholder="소개 입력"
                    />
                </div>
            </div>

            <div className="flex gap-12 justify-center">
                <BackBtn />
                <Button text="확인" type="submit" onSubmit={handleSubmit}>
                    확인
                </Button>
            </div>
        </form>
    );
}

export default Register;
