import DetailImage from '../components/DetailComponents/DetailImage';
import DetailInfo from '../components/DetailComponents/DetailInfo';
import DetailList from '../components/DetailComponents/DetailList';
import DetailMap from '../components/DetailComponents/DetailMap';
import EventBox from '../components/DetailComponents/EventBox';
import MapNavi from '../components/DetailComponents/MapNavi';
import ProductName from '../components/DetailComponents/ProductName';
import { useParams } from 'react-router-dom';
import useStore from '../store/accomodation';

export default function DetailPage() {
    const { accomodation_id } = useParams(); // useParams로 ID 가져오기
    const { accomodation } = useStore(); // useStore로 전체 숙소 리스트 가져오기

    // 해당 ID와 일치하는 숙소 정보 찾기
    const detailItem = accomodation.find(
        (item) => item.accomodation_id === accomodation_id
    );

    return (
        <div className="max-w-mw mx-auto">
            <DetailImage />
            <ProductName detailItem={detailItem} />
            <MapNavi />
            <div className="flex justify-between">
                <div>
                    <DetailList />
                    <DetailInfo />
                </div>
                <div className="py-5">
                    <EventBox />
                </div>
            </div>
            <DetailMap />
        </div>
    );
}
