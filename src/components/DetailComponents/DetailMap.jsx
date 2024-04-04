import { useEffect } from 'react';
import useStore from '../../store/accomodation';

export default function DetailMap({ roomItem }) {
    const { data, ajax } = useStore(); // useStore로 전체 숙소 리스트 가져오기

    useEffect(() => {
        if (data.length === 0) {
            // 숙소 정보가 없을 경우, ajax를 통해 데이터를 가져옵니다.
            ajax();
        } else {
            // 숙소 정보가 있다면, 첫 번째 숙소의 주소를 이용하여 지도를 초기화합니다.
            const address = roomItem.address; // 숙소의 주소를 가져옴.

            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표 (제주시)
                level: 3, // 지도의 확대 레벨
            };

            // 지도를 생성합니다
            const map = new kakao.maps.Map(mapContainer, mapOption);

            // 주소-좌표 변환 객체를 생성합니다
            const geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(address, function (result, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(
                        result[0].y,
                        result[0].x
                    );

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords,
                    });

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }
    }, [data, ajax]); // accomodation과 ajax를 의존성 배열에 추가합니다.

    return (
        <div>
            <div className="pt-8 pb-3 font-semibold text-2xl border-gray-200 border-solid border-t-2">
                숙소 위치 정보
            </div>
            <div
                className="h-[480px] mb-10 rounded-xl border-gray-200 border-solid border-2"
                id="map">
                카카오, 네이버 API 고려~
            </div>
        </div>
    );
}
