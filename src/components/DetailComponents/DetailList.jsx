import PriceBlock from '../PriceBlock';
import CheckInOut from './CheckInOut';
import Button from '../Common/Button';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../store/accomodation';
export default function DetailList({ roomItems }) {
    const { room_info } = roomItems;
    const { id } = useParams(); // useParams로 ID 가져오기
    const { data } = useStore(); // useStore로 전체 숙소 리스트 가져오기
    console.log(roomItems);

    // 해당 ID와 일치하는 숙소 정보 찾기
    const detailItem = data.find((item) => item.id === id);
    return (
        <div className="w-[880px]">
            {roomItems.map((item, index) => (
                <div
                    className="flex justify-between py-5 border-gray-200 border-solid border-b-2"
                    key={index}>
                    <div className="flex gap-3 w-fit">
                        <img
                            src="../img/Frame4.png"
                            alt="객실이미지"
                            className=" w-52 h-52 bg-slate-300 rounded"
                        />
                        <CheckInOut
                            stayTitle={item.roomInfo}
                            checkIn="입실 14:00"
                            checkOut="퇴실 11:00"
                        />
                    </div>

                    <div className="mt-20 relative">
                        <PriceBlock
                            // text={`-${item.sale}%`}
                            fixedPrice={item.price}
                            // discountRate={item.sale}
                        />

                        {/* <Link
                            to={`/reservation/${id}/${detailItem.roomName}/${item.room_info}`}
                            key={room_info}>
                            <Button
                                className="absolute right-0 bottom-5"
                                text="객실 예약"
                            />
                        </Link> */}
                    </div>
                </div>
            ))}
        </div>
    );
}
