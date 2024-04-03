import React, { useEffect, useState } from 'react';
import Title from '../components/Common/Title';
import ReservationItem from '../components/ReservationComponents/ReservationItem';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Pagination from '../components/Pagination';

export default function MyInfo() {
    const [activeTab, setActiveTab] = useState('personalInfo');
    const [cookies] = useCookies(['secretKey']);
    const [reservations, setReservations] = useState([]);
    const [rooms, setRooms] = useState([]);

    const handleTab1 = () => {
        setActiveTab('personalInfo');
    };

    const handleTab2 = () => {
        setActiveTab('reservationHistory');
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get('/api/v1/reservation', {
                headers: {
                    Authorization: `Bearer ${cookies.secretKey}`,
                },
            });
            setReservations(response.data.data); // 예약 내역을 상태로 설정
            const accommdation = response.data.data;

            const roomArray = accommdation.flatMap((item) =>
                Array.isArray(item.room) ? item.room : [item.room]
            ); // room 배열 생성
            setRooms(roomArray); // 객실 정보 상태로 저장
        } catch (error) {
            console.error('error:', error);
        }
    };

    //pagination
    const [page, setPage] = useState(1); // 페이지
    const limit = 7; // 페이지당 최대 보여줄 아이템 수
    const offset = (page - 1) * limit; // 페이지네이션을 위한 offset

    useEffect(() => {
        // 컴포넌트가 마운트될 때 예약 내역을 조회
        fetchReservations();
    }, []);

    return (
        <div className="container flex gap-10 max-w-2xl mx-auto mb-32 mt-24">
            <div className="content flex flex-col gap-6 grow">
                <Title className="searchResult" tag="h2" text={'마이 페이지'} />
                <ul className="flex border-b-[1px] border-solid  border-gray-300 font-bold text-xl cursor-pointer">
                    <li
                        className={`${
                            activeTab === 'personalInfo'
                                ? ' border-b-[1px] border-solid  border-gray-500'
                                : 'text-gray-300 '
                        } p-2`}
                        onClick={handleTab1}>
                        내 정보
                    </li>
                    <li
                        className={`${
                            activeTab === 'reservationHistory'
                                ? ' border-b-[1px] border-solid  border-gray-500'
                                : 'text-gray-300 '
                        } p-2`}
                        onClick={handleTab2}>
                        예약내역{' '}
                    </li>
                </ul>

                <div className="outlet">
                    {activeTab === 'personalInfo' ? (
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="mb-1 font-light text-sm text-slate-600">
                                    이메일
                                </p>
                                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                                    Email@email.com
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 font-light text-sm text-slate-600">
                                    이름
                                </p>
                                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                                    User_Name
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 font-light text-sm text-slate-600">
                                    휴대폰 번호
                                </p>
                                <p className="bg-gray-100 py-3 px-4 font-light rounded">
                                    010-1234-5678{' '}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {rooms.map((reservation, index) => (
                                <React.Fragment key={index}>
                                    <ReservationItem
                                        clickedRoom={reservation}
                                        detailItem={reservation}
                                    />
                                    <hr />
                                </React.Fragment>
                            ))}
                            <Pagination
                                limit={limit}
                                page={page}
                                totalPosts={reservations.length}
                                setPage={setPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
