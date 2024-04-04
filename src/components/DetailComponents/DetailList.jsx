import PriceBlock from '../PriceBlock';
import CheckInOut from './CheckInOut';
import Button from '../Common/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChakraModal from '../ChakraModal';
import { useDisclosure } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import logo from '../../img/logo.svg';

export default function DetailList({ roomItems, detailItem }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cookies] = useCookies(['secretKey']); // 'secretKey'는 로그인 토큰을 저장하는 쿠키의 이름
    const navigate = useNavigate();
    const { id } = useParams();

    const handleReservationClick = (itemId) => {
        // 로그인 여부 확인
        const isLoggedIn = cookies.secretKey; // 로그인 상태 확인. 쿠키에 secretKey가 있다면 로그인 상태로 가정

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

                        <div className="mt-20">
                            <PriceBlock
                                text={`-${detailItem.discount}%`}
                                fixedPrice={item.price}
                                discountRate={detailItem.discount}
                            />
                            <Button
                                text="객실 예약"
                                onClick={() => handleReservationClick(item.id)}
                            />
                            {/* ChakraModal 컴포넌트. 로그인이 필요할 때 표시됩니다. */}
                            <ChakraModal isOpen={isOpen} onClose={onClose}>
                                <h1 className="text-5xl font-medium mb-10 text-primary">
                                    <img
                                        src={logo}
                                        alt="Slide 1"
                                        className="w-full h-full object-cover"
                                    />
                                </h1>
                                <h2 className="text-3xl font-medium mb-1">
                                    객실 예약은
                                </h2>
                                <h2 className="text-3xl font-medium mb-8">
                                    <span className="font-extrabold">
                                        로그인
                                    </span>
                                    이 필요합니다.
                                </h2>
                                <p className="mb-1 font-semibold text-slate-600">
                                    아직 회원이 아니신가요?
                                </p>
                                <p className="font-semibold text-slate-600">
                                    지금 가입하고 특별한 혜택을 경험하세요!
                                </p>
                                <div className="flex gap-3 justify-center py-12 border-slate-300 border-solid border-b-2">
                                    <Link to="/signup">
                                        <Button
                                            text="회원가입"
                                            className="w-[193px] h-14 text-lg"
                                        />
                                    </Link>
                                    <Link to="/signin">
                                        <Button
                                            text="로그인"
                                            className="w-[193px] h-14 text-lg"
                                        />
                                    </Link>
                                </div>
                                <p
                                    onClick={onClose}
                                    className="font-bold text-lg p-3 text-primary cursor-pointer">
                                    로그인없이 둘러보기
                                </p>
                            </ChakraModal>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
}
