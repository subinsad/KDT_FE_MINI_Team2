import { useEffect } from 'react';

export default function DetailMap() {
    useEffect(() => {
        const container = document.getElementById('map'); // 지도를 담을 영역의 dom 레퍼런스
        const options = {
            center: new kakao.maps.LatLng(
                37.365264512305174,
                127.10676860117488
            ), // 지도의 중심좌표
            level: 3,
        };
        const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        const markerPosition = new kakao.maps.LatLng(
            37.365264512305174,
            127.10676860117488
        ); // 마커 생성
        const marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map);
    }, []);

    return (
        <div>
            <div className="pt-8 pb-3 font-semibold text-2xl border-gray-200 border-solid border-t-2">
                숙소 위치 정보
            </div>
            <div
                className="h-[480px] mb-10 rounded-xl border-gray-200 border-solid border-2"
                id="map">
                카카오,네이버 API 고려~
            </div>
        </div>
    );
}
