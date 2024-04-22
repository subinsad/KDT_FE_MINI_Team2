// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ScaleLoader } from 'react-spinners';

import RoomItem from '../components/RegisterComponents/RoomItem';
import TitleBtn from '../components/RegisterComponents/TitleBtn';
import TItle from '../components/Common/Title';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Spinner from '../components/Common/Spinner';

function AdminPage() {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [cookies] = useCookies(['secretKey']);
    const handleRoomClick = (roomId) => {
        setSelectedRoomId(roomId);
    };
    const [accommodations, setAccommodations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 설정
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAccommodation();
    }, [currentPage]);

    const fetchAccommodation = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/v1/accommodation/member', {
                headers: {
                    Authorization: `Bearer ${cookies.secretKey}`,
                },
                params: {
                    page: currentPage,
                },
            });

            const responseData = response.data;
            console.log(responseData.data.result);

            // 가져온 데이터에서 숙소 정보만 추출하여 상태에 업데이트
            const accommodationsData = responseData.data.result || []; // 숙소 정보 배열
            setAccommodations(accommodationsData);
            console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    //페이지네이션
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // 이전 페이지로 이동
        }
    };
    const handleNext = async () => {
        try {
            const response = await axios.get(
                `/v1/accommodation/member?page=${currentPage}`,
                {
                    params: {
                        page: currentPage + 1, // 다음 페이지 번호 설정
                    },
                }
            );
            console.log(response);
            setCurrentPage(currentPage + 1); // 페이지 번호 업데이트
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="max-w-mw mx-auto pt-12 pb-12">
                <div className="medium:flex medium:flex-row medium:gap-12  h-full  flex flex-col p-6 gap-12">
                    <div className="medium:flex medium:flex-col medium:w-2/4 medium:p-4 w-full medium:h-full ">
                        <TitleBtn
                            TitleText="숙소 등록"
                            LinkTo="/register"
                            text="+ 숙소등록"
                            className="mb-6"
                        />
                        <div className="flex justify-between flex-col medium:h-[515px] p-8 border-2 border-solid border-gray-300 rounded-xl">
                            {isLoading ? (
                                <ScaleLoader
                                    color="#2393D2"
                                    className="flex items-center justify-center "
                                />
                            ) : (
                                <>
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
                                            onClick={() =>
                                                handleRoomClick(item.id)
                                            }
                                            setAccommodations={
                                                setAccommodations
                                            }
                                            cookies={cookies}
                                        />
                                    ))}

                                    <Pagination
                                        onClick={handleNext}
                                        handleNext={handleNext}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        handlePrevious={handlePrevious}
                                    />
                                </>
                            )}
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
