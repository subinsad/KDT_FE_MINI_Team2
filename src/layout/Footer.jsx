import Button from "../components/Common/Button";

export default function Footer() {
  if (window.location.pathname === "/signin") return null;
  if (window.location.pathname === "/signup") return null;

  return (
    <footer className="py-10 border-t-2 border-gray-200 border-solid">
      <div className="max-w-mw mx-auto">
        <div className="flex">
          <ul>
            <li className="text-gray-500 font-bold mb-3">고객센터</li>
            <p className="text-gray-500 text-sm mb-3">
              오전 9시 ~ 새벽 3시 운영
            </p>
            <Button
              className="bg-gray-300 mb-4 w-30 h-11 mr-3"
              text="1555-0000"
            ></Button>
            <Button
              className="bg-gray-300 mb-4 w-30 h-11"
              text="카카오 문의"
            ></Button>
          </ul>
        </div>

        <p className="text-gray-500 font-extralight text-xs mb-7">
          (주)FASTCAMPUS
          <br />
          주소:서울특별시 강남구 봉은사로 479,479타워 11층 | 대표이사:
          FASTCAMPUS | 사업자등록번호 : 000-00-00000
          <br />
          전자우편주소 : 000@goodchoice.kr | 통신판매번호 : 2024-서울강남-0001 |
          관광사업자 등록번호 : 제1000-01호 | 전화번호 : 1670-0001 |
          호스팅서비스제공자의 상호 표시: (주)FASTCAMPUS
          <br />
          (주)FASTCAMPUS는 통신판매중개자로써 통신판매의 당사자가 아니며, 상품
          예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
        </p>
        <div className="text-sm mt-4 text-gray-400">
          <p>Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
