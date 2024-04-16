// AdminPage.jsx
import React, { useState } from 'react';

import RoomItem from '../components/RegisterComponents/RoomItem';
import TitleBtn from '../components/RegisterComponents/TitleBtn';

function AdminPage() {
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const handleRoomClick = (roomId) => {
        setSelectedRoomId(roomId);
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
                            <RoomItem
                                key="1"
                                id="1"
                                title="서울호텔"
                                text="1"
                                room="3"
                                type="호텔"
                                btn="true"
                                istrue={selectedRoomId === '1'} // 선택된 방일 때만 true
                                onClick={() => handleRoomClick('1')} // 클릭 시 해당 방의 ID를 전달
                            />
                            <RoomItem
                                key="2"
                                id="2"
                                title="인천호텔"
                                text="2"
                                room="5"
                                type="호텔"
                                btn="true"
                                istrue={selectedRoomId === '2'}
                                onClick={() => handleRoomClick('2')}
                            />
                        </div>
                    </div>

                    <div className="medium:flex medium:flex-col medium:w-2/4 medium:p-4 w-full">
                        <TitleBtn
                            TitleText="룸 조회"
                            LinkTo="/roomregister"
                            text="+ 룸등록"
                            className="mb-6"
                        />
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
                                <div> 숙소를 클릭해주세요 </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPage;
