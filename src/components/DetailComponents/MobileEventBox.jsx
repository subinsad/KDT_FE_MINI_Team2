import { useState } from 'react';
import event from '../../img/event.jpg';
import event2 from '../../img/event2.webp';
import event3 from '../../img/event2.webp';
import { IoClose } from 'react-icons/io5';
import { MdOutlineNavigateNext } from 'react-icons/md';

import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal } from '@chakra-ui/react';
import Badge from '../Common/Badge';

export default function MobileEventBox() {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <div className=" mb-4 flex flex-col ">
            <div className="w-full mb-4">
                <Swiper
                    className="w-full h-full bg-slate-300 rounded"
                    modules={[Autoplay, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    autoplay={{ delay: 3000 }}
                    pagination={{ clickable: true }} // 페이지네이션 설정
                >
                    <SwiperSlide>
                        <img
                            src={event}
                            alt="Slide 1"
                            className="w-full  object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={event2}
                            alt="Slide 2"
                            className="w-full object-cover"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={event3}
                            alt="Slide 3"
                            className="w-full object-cover"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="leading-5 text-sm">
                <div className="flex items-center justify-between">
                    <h2 className="py-3 font-bold text-xl">결제 혜택</h2>
                    <button
                        onClick={openModal}
                        className="flex gap-2 items-center text-primary font-bold text-sm">
                        더보기 <MdOutlineNavigateNext />
                    </button>
                    <Modal isOpen={isOpen} onRequestClose={closeModal}>
                        <div className="fixed inset-0 flex-col bg-white p-6 rounded-lg z-50 ">
                            <div className="flex mb-10">
                                <button
                                    onClick={closeModal}
                                    className="text-3xl">
                                    <IoClose />
                                </button>

                                <h1 className="text-gray-900 font-bold text-lg  m-auto">
                                    결제 혜택 안내
                                </h1>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-3">
                                    <h3 className="pb-2 font-bold text-lg flex gap-2">
                                        <Badge
                                            text="혜택"
                                            className="bg-red-100 text-red-500"
                                        />
                                        토스페이
                                    </h3>
                                    <ul className="list-none bg-gray-100 p-5 text-xs rounded">
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            3만원 이상, 10%
                                            <span className="font-bold">
                                                최대 1만원 할인
                                            </span>
                                            (오전 10시,일 400명)
                                        </li>
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            2만원 이상,{' '}
                                            <span className="font-bold">
                                                최대 2천원 할인
                                            </span>{' '}
                                            (오후 4시, 일 1,700명)
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="pb-2 font-bold text-lg flex gap-2">
                                        <Badge
                                            text="혜택"
                                            className="bg-red-100 text-red-500"
                                        />
                                        카카오페이
                                    </h3>
                                    <ul className="list-none bg-gray-100 p-5 text-xs rounded">
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            호텔/펜션 - 7만원 이상, 10% 할인
                                            (오전0시, 일 700명)
                                        </li>
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            <span className="font-bold">
                                                최대 할인금액 1만원
                                            </span>{' '}
                                        </li>
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            모텔 - 2만원 이상 ,
                                            <span className="font-bold">
                                                최대 할인금액 1만원
                                            </span>
                                            (오전0시, 일 700명)
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="pb-2 font-bold text-lg flex gap-2">
                                        <Badge
                                            text="혜택"
                                            className="bg-red-100 text-red-500"
                                        />
                                        신용/체크카드
                                    </h3>
                                    <ul className="list-none bg-gray-100 p-5 text-xs rounded">
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            국내숙소 - 7만원 이상,
                                            <span className="font-bold">
                                                5천원 할인
                                            </span>
                                        </li>
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            오전 0시 우리 (일 80명), 농협 (일
                                            160명)
                                        </li>
                                        <li className="flex items-center leading-7">
                                            <span className="block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
                                            롯데 (일 160명), 하나 (일 130명)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <h3 className="pb-2 font-bold text-lg">토스페이</h3>

                <li>3만원 이상, 10% 최대 1만원 할인(오전 10시, 일 400명)</li>
                <li>2만원 이상, 2천원 할인 (오후 4시, 일 1,700명)</li>
            </div>
        </div>
    );
}
