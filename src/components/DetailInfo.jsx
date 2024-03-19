export default function DetailInfo() {
  return (
    <div className="border-gray-200 border-solid border-2">
      <div className="leading-6 my-6">
        <h2 className="py-5 font-semibold text-2xl">숙소 이용 정보</h2>

        <h3 className="pb-3 font-semibold text-lg">기본 정보</h3>
        <li>체크인 14:00 | 체크아웃 11:00</li>
        <li>22시 이후 체크인시 프론트 문의</li>
        <li>무료 WI-FI</li>
        <li>전 객실 금연</li>
        <li>무료 주차 가능</li>

        <h3 className="py-3 font-semibold text-lg">인원 추가 정보</h3>
        <li>기준 인원 외 추가 시 1인 24,000, 37개월 미만 무료</li>
        <li>
          인원 추가 비용에는 별도 청구 또는 보조 침대 불포함 (침구 또는 보조
          침대 별도 비용 발생)
        </li>
        <li>
          전 객실 최대 성인 3인 또는 성인 2인 및 소아(37개월 이상 ~ 만 12세
          이하) 2인 투숙 가능
        </li>
      </div>
    </div>
  );
}
