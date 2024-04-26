import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ScaleLoader } from 'react-spinners';
import useStore from '../store/accomodation';

import RoomItem from '../components/RegisterComponents/RoomItem';
import TitleBtn from '../components/RegisterComponents/TitleBtn';
import TItle from '../components/Common/Title';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Pagination from '../components/Pagination';
import AccommodationItem from '../components/RegisterComponents/AccommodationItem';
import NumberPagination from '../components/NumberPagination';

function AdminPage() {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState([]); // 선택된 방 정보를 배열로 변경

    const [cookies] = useCookies(['secretKey']);
    const { data, ajax } = useStore(); // useStore로 전체 숙소 리스트 가져오기
    const [accommodations, setAccommodations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 설정
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAccommodation();
    }, [currentPage]);

    //숙소전체데이터
    useEffect(() => {
        ajax();
    }, []);

    useEffect(() => {
        setSelectedRoom(data.filter((item) => item.id === selectedRoomId));
    }, [selectedRoomId, data]);

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
            // 가져온 데이터에서 숙소 정보만 추출하여 상태에 업데이트
            const accommodationsData = responseData.data.result || []; // 숙소 정보 배열
            setAccommodations(accommodationsData);
            setTotalResults(responseData.data.totalCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoomClick = async (roomId) => {
        // 클릭 시 선택된 방 ID를 설정
        setSelectedRoomId(roomId);
        // 선택된 방 ID를 기반으로 숙소 정보를 다시 가져옴
        await ajax();
    };

    //페이지네이션
    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1); // 이전 페이지로 이동
            fetchAccommodation();
        }
    };
    const handleNext = async () => {
        try {
            const response = await axios.get(
                `/v1/accommodation/member?page=${currentPage - 1}`,

                {
                    params: {
                        page: currentPage + 1, // 다음 페이지 번호 설정
                    },
                }
            );
            console.log(response);
            setCurrentPage(currentPage + 1); // 페이지 번호 업데이트
            fetchAccommodation();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="max-w-mw mx-auto pt-12 pb-12">
                <div className="gap-8 medium:flex medium:flex-row medium:gap-8 h-full flex flex-col p-6">
                    <div className="medium:flex medium:flex-col medium:w-2/4 w-full medium:h-full ">
                        <TitleBtn
                            TitleText="숙소 등록"
                            LinkTo="/register"
                            text="+ 숙소등록"
                            className="mb-6"
                        />
                        <div className="flex justify-between flex-col medium:h-[560px] p-6 px-10 border-2 border-solid border-gray-300 rounded-xl">
                            {isLoading ? (
                                <ScaleLoader
                                    color="#2393D2"
                                    className="flex items-center justify-center "
                                />
                            ) : (
                                <>
                                    <div className="flex flex-col justify-between h-full ">
                                        {accommodations.map((item, index) => (
                                            <AccommodationItem
                                                key={index}
                                                id={item.id}
                                                title={item.accommodationName}
                                                text={item.id}
                                                room={item.room.length}
                                                type={item.accommodationType}
                                                btn="true"
                                                istrue={
                                                    selectedRoomId === item.id
                                                }
                                                onClick={() =>
                                                    handleRoomClick(item.id)
                                                }
                                                setAccommodations={
                                                    setAccommodations
                                                }
                                                cookies={cookies}
                                                fetchAccommodation={
                                                    fetchAccommodation
                                                }
                                            />
                                        ))}
                                    </div>
                                    {/* <Pagination
                                        onClick={handleNext}
                                        handleNext={handleNext}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        handlePrevious={handlePrevious}
                                    /> */}

                                    <NumberPagination
                                        totalPosts={totalResults}
                                        limit={4}
                                        page={currentPage}
                                        setPage={setCurrentPage} // setPage를 이용해 현재 페이지를 설정
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="medium:flex medium:flex-col medium:w-2/4 w-full">
                        <TItle tag="h2" text="룸 조회" className="mb-8" />
                        <div className="flex h-[560px] justify-between flex-col p-6 px-10 border-2 border-solid border-gray-300 rounded-xl overflow-y-auto">
                            {selectedRoom.length > 0 ? (
                                selectedRoom.map((roomItem, index) => (
                                    <div key={index}>
                                        {roomItem.room.flatMap((item) => (
                                            <RoomItem
                                                key={index} // 선택된 방의 ID를 key로 사용
                                                title={item.roomName}
                                                text={item.roomInfo}
                                                fixedMember={item.fixedMember}
                                                maxedMember={item.maxedMember}
                                                id={item.id}
                                                roomImage={item.roomImage}
                                            />
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col gap-4 items-center h-full justify-center ">
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
