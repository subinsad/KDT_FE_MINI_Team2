import React, { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import Input from '../components/Form/Input';
import Button from '../components/Common/Button';
import axios from 'axios';
import BackBtn from '../components/Common/BackBtn';
import { useNavigate, useParams } from 'react-router';

function RoomRegister() {
    const [cookies] = useCookies(['secretKey']);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedFileName, setSelectedFileName] = useState('');
    const { id } = useParams();
    const [inputValue, setInputValue] = useState({
        accommodationId: id,
        roomName: '',
        roomInfo: '',
        fixedNumber: '',
        maxedNumber: '',
        price: '',
        roomImage: '', // 파일을 선택하기 전에는 null로 초기화
    });

    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = inputValue;

        try {
            setIsLoading(true);
            const formData = new FormData();

            const jsonData = {
                accommodationId: value.accommodationId,
                roomName: value.roomName,
                roomInfo: value.roomInfo,
                fixedNumber: value.fixedNumber,
                maxedNumber: value.maxedNumber,
                price: value.price,
            };

            const blob = new Blob([JSON.stringify(jsonData)], {
                type: 'application/json',
            });
            formData.append('request', blob);
            formData.append('image', fileInputRef.current.files[0]);

            const response = await axios.post(
                `/api/v1/accommodation/${value.accommodationId}/room`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.secretKey}`,
                        'Content-Type': 'multipart/form-data', // Content-Type 설정
                    },
                }
            );

            navigate(-1);
            console.log('Response:', response); // 응답 출력
        } catch (error) {
            console.error('에러 발생:', error); // 에러 메시지를 콘솔에 출력
        }
    };

    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            setInputValue({
                ...inputValue,
                roomImage: file,
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
                <h3 className="pb-2 font-bold text-lg">Room 등록하기</h3>
                <p> 등록할 룸정보를 입력해주세요 </p>
            </div>

            <div className="flex gap-3">
                <div className="w-9/12">
                    <Input
                        className="w-full"
                        value={inputValue.roomName}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                roomName: e.target.value,
                            });
                        }}
                        type="text"
                        text="룸 이름"
                        placeholder="룸이름 입력"
                    />
                </div>

                <div className="w-3/12">
                    <Input
                        className="w-full cursor-not-allowed opacity-50 bg-gray-200"
                        value={inputValue.accommodationId}
                        readOnly // 사용자가 변경할 수 없도록 함
                        type="text"
                        text="숙소 Id "
                        placeholder="숙소 Id 입력"
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-9/12">
                    <Input
                        className="w-full"
                        value={inputValue.roomInfo}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                roomInfo: e.target.value,
                            });
                        }}
                        type="text"
                        text="숙소 이용 정보"
                        placeholder="숙소 이용 정보 입력"
                    />
                </div>

                <div className="w-3/12">
                    <p className="mb-1 font-light text-sm text-slate-600">
                        기본 인원
                    </p>
                    <select
                        className="bg-gray-100 py-3 px-4 font-light rounded hover:bg-gray-200 w-full "
                        name="accommodationType"
                        value={inputValue.fixedNumber}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                fixedNumber: e.target.value,
                            });
                        }}>
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                        <option value="5">5명</option>
                        <option value="6">6명</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="w-9/12 flex flex-col">
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

                <div className="w-3/12">
                    <p className="mb-1 font-light text-sm text-slate-600">
                        최대 인원
                    </p>
                    <select
                        className="bg-gray-100 py-3 px-4 font-light rounded hover:bg-gray-200 w-full "
                        name="accommodationType"
                        value={inputValue.maxedNumber}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                maxedNumber: e.target.value,
                            });
                        }}>
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                        <option value="5">5명</option>
                        <option value="6">6명</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-full">
                    <Input
                        className="w-full"
                        value={inputValue.price}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                price: e.target.value,
                            });
                        }}
                        type="text"
                        text="가격"
                        placeholder="가격 입력"
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

export default RoomRegister;
