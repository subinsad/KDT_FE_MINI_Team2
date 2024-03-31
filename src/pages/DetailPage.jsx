import DetailImage from '../components/DetailComponents/DetailImage';
import DetailInfo from '../components/DetailComponents/DetailInfo';
import DetailList from '../components/DetailComponents/DetailList';
import DetailMap from '../components/DetailComponents/DetailMap';
import EventBox from '../components/DetailComponents/EventBox';
import MapNavi from '../components/DetailComponents/MapNavi';
import ProductName from '../components/DetailComponents/ProductName';
import { useParams } from 'react-router-dom';
import useStore from '../store/accomodation';
import { useEffect, useRef } from 'react';

export default function DetailPage() {
    const { id } = useParams(); // useParams로 ID 가져오기
    const { data, ajax } = useStore(); // useStore로 전체 숙소 리스트 가져오기

    const detailItemId = parseInt(id); // 숫자로 변경
    // 해당 ID와 일치하는 숙소 정보 찾기
    const detailItem = data.find((item) => item.id === detailItemId);

    //해당하는 상세페이지, 숙소
    const roomItems = detailItem?.room || [];
    console.log(roomItems);

    useEffect(() => {
        ajax();
    }, []);

    const topRef = useRef([]);
    const moveBtn = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-mw mx-auto" ref={topRef}>
            <DetailImage />
            <ProductName detailItem={detailItem} />
            <MapNavi moveBtn={moveBtn} />
            <div className="flex justify-between">
                <div>
                    <DetailList roomItems={roomItems} />
                    <DetailInfo />
                </div>
                <div className="py-5">
                    <EventBox />
                </div>
            </div>
            {/* <DetailMap roomItem={roomItem} /> */}
        </div>
    );
}
