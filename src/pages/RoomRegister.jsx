import React, { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import Input from '../components/Form/Input';
import Button from '../components/Common/Button';
import axios from 'axios';
import BackBtn from '../components/Common/BackBtn';

function RoomRegister() {
    const [cookies] = useCookies(['secretKey']);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [inputValue, setInputValue] = useState({
        accommodationId: '',
        roomName: '',
        roomInfo: '',
        fixedNumber: '',
        maxedNumber: '',
        price: '',
        roomImage: '', // 파일을 선택하기 전에는 null로 초기화
    });

    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        console.log('hh');
        event.preventDefault();
        const value = inputValue;

        try {
            const response = await axios.post(
                `/api/v1/accommodation/${value.accommodationId}/room`,
                {
                    accommodationId: value.accommodationId,
                    roomName: value.roomName,
                    roomInfo: value.roomInfo,
                    fixedNumber: value.fixedNumber,
                    maxedNumber: value.maxedNumber,
                    price: value.price,
                    roomImage: value.roomImage, // 파일 데이터 직접 추가
                },

                {
                    headers: {
                        Authorization: `Bearer ${cookies.secretKey}`,
                    },
                }
            );

            console.log('Response:', response); // 응답 출력
        } catch (error) {
            console.error('에러 발생:', error); // 에러 메시지를 콘솔에 출력
        }
    };

    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            setSelectedFileName(file.name); // 선택된 파일의 이름을 상태에 저장합니다.
            const formData = new FormData();
            formData.append('roomImage', file); // 여기서 'roomImage'로 변경
            setInputValue({
                ...inputValue,
                roomImage: URL.createObjectURL(file), // 배열이 아니라 객체로 업데이트
            });
        } else {
            setSelectedFileName(''); // 파일이 선택되지 않았을 때는 상태를 초기화합니다.
            console.error('선택된 파일이 없습니다.');
        }
    };

    return (
        <form
            className="max-w-mw mx-auto w-2/4 flex flex-col gap-4 pt-16 pb-16"
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
                        className="w-full"
                        value={inputValue.accommodationId}
                        onChange={(e) => {
                            setInputValue({
                                ...inputValue,
                                accommodationId: e.target.value,
                            });
                        }}
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
                    {/* <label className="inline-block px-5 py-2 text-slate-500 bg-gray-100 cursor-pointer h-10">
                        <input type="" />
                        <input
                            ref={fileInputRef}
                            type="file"
                            // style={{ display: 'none' }} // 파일 입력 필드를 숨깁니다.
                            onChange={handleFileInputChange}
                            className="bg-gray-100"
                        />

                        <span className="ml-2">{selectedFileName}</span>
                    </label> */}

                    <div class="filebox">
                        <input
                            lassName="inline-block px-5 py-2 text-slate-500 bg-gray-100 cursor-pointer h-10"
                            type="file"
                        />
                        <label for="file" className="bg-gray-300 p-2 rounded">
                            파일찾기
                            <input type="file" style={{ display: 'none' }} />
                        </label>
                    </div>
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
