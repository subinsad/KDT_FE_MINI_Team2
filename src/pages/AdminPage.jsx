// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import RoomItem from '../components/RegisterComponents/RoomItem';
import TitleBtn from '../components/RegisterComponents/TitleBtn';
import TItle from '../components/Common/Title';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function AdminPage() {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [cookies] = useCookies(['secretKey']);
    const handleRoomClick = (roomId) => {
        setSelectedRoomId(roomId);
    };
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        fetchAccommodation();
    }, []);

    const fetchAccommodation = async () => {
        try {
            const response = await axios.get('/api/v1/accommodation/member', {
                headers: {
                    Authorization: `Bearer ${cookies.secretKey}`,
                },
            });

            const responseData = response.data;

            // 가져온 데이터에서 숙소 정보만 추출하여 상태에 업데이트
            const accommodationsData = responseData.data || []; // 숙소 정보 배열
            setAccommodations(accommodationsData);
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="max-w-mw mx-auto pt-12 pb-12">
                <div className="medium:flex medium:flex-row medium:gap-12 medium:h-[440px] flex flex-col h-auto p-6 gap-12">
                    <div className="medium:flex medium:flex-col medium:w-2/4 medium:p-4 w-full ">
                        <TitleBtn
                            TitleText="숙소 등록"
                            LinkTo="/register"
                            text="+ 숙소등록"
                            className="mb-6"
                        />
                        <div className="flex justify-between flex-col p-8 border-2 border-solid border-gray-300 rounded-xl">
                            {accommodations.map((item, index) => (
                                <RoomItem
                                    key={index}
                                    id={item.id}
                                    title={item.accommodationName}
                                    text={item.id}
                                    room={item.room.index}
                                    type={item.accommodationType}
                                    btn="true"
                                    istrue={selectedRoomId === item.id}
                                    onClick={() => handleRoomClick(item.id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="medium:flex medium:flex-col medium:w-2/4 medium:p-4 w-full">
                        <TItle tag="h2" text="룸 조회" className="mb-8" />
                        <div className="flex justify-between flex-col p-8 border-2 border-solid border-gray-300 rounded-xl">
                            {selectedRoomId ? (
                                <>
                                    <RoomItem
                                        key={selectedRoomId} // 선택된 방의 ID를 key로 사용
                                        title="스위트룸"
                                        text="1"
                                        room="3"
                                        type="호텔"
                                    />
                                    <RoomItem
                                        key={`${selectedRoomId}-detail`} // 선택된 방의 ID와 "-detail"을 더한 값을 key로 사용
                                        title="서울호텔"
                                        text="1"
                                        room="3"
                                        type="호텔"
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col gap-4 items-center ">
                                    <FaSearch className="text-7xl text-gray-300 mb-4" />
                                    <p className="font-bold text-gray-500">
                                        숙소를 클릭해 룸을 조회해주세요
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPage;
