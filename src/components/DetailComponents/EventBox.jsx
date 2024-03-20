export default function EventBox() {
  return (
    <div className="w-72 sticky top-32 h-[608px] p-4 rounded-xl border-gray-200 border-solid border-2 flex flex-col items-center">
      <div className="w-full h-36 rounded-xl border-gray-200 border-solid border-2">
        {/* 이 부분에는 이벤트 이미지가 들어갈 것입니다. */}
      </div>
      <div className="leading-5 text-sm">
        <h2 className="py-3 font-bold text-xl">결제 혜택</h2>

        <h3 className="pb-2 font-bold text-lg">토스페이</h3>
        <li>3만원 이상, 10% 최대 1만원 할인(오전 10시, 일 400명)</li>
        <li>2만원 이상, 2천원 할인 (오후 4시, 일 1,700명)</li>
      </div>

      <div className="pt-3 leading-5 text-sm">
        <h3 className="pb-2 font-bold text-lg">카카오페이</h3>
        <li>3만원 이상, 10% 최대 1만원 할인(오전 10시, 일 400명)</li>
        <li>2만원 이상, 2천원 할인 (오후 4시, 일 1,700명)</li>
      </div>

      <div className="pt-3 leading-5 text-sm">
        <h3 className="pb-2 font-bold text-lg">신용/체크카드</h3>
        <li>국내숙소 - 7만원 이상, 5천원 할인</li>
        <li>오전 이상, 우리 (일 90명), 롯데 (일 290명), 하나 (일 130명)</li>
      </div>
    </div>
  );
}
