import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import { useUser } from '../store/user'; // Zustand 스토어 사용
import { useCookies } from 'react-cookie';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../img/logo.svg';

export default function Gnb() {
    const navigate = useNavigate();
    const { loginUser, memberId, logout } = useUser(); // Zustand 스토어에서 상태와 함수 사용
    const isAuthenticated = Boolean(loginUser); // 로그인 상태 확인
    const [, , removeCookie] = useCookies(['secretKey', 'memberId']); // useCookies 훅 사용
    const [dropdown, setDropdown] = useState(false); // 드롭다운 상태

    const handleLogout = () => {
        logout(); // Zustand를 통해 로그아웃 처리
        removeCookie('secretKey', { path: '/' }); // secretKey 쿠키 삭제
        removeCookie('memberId', { path: '/' }); // memberId 쿠키 삭제
        navigate('/signin'); // 로그인 페이지로 리디렉션
    };

    //눌렀을 때 메인페이지의 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <header className="py-5 px-4 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50">
            <div className="max-w-mw mx-auto flex items-center justify-between">
                <Link
                    to="/"
                    onClick={scrollToTop}
                    className="text-3xl font-bold text-primary">
                    <img
                        src={logo}
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                </Link>
                <nav className="flex items-center gap-6 font-semibold">
                    <Link to="/notice"> 공지사항 </Link>
                    {isAuthenticated ? (
                        <div className="relative">
                            <Button
                                className="flex gap-3 rounded-md"
                                text={
                                    <>
                                        <RxHamburgerMenu />
                                        <FaUserCircle />
                                    </>
                                }
                                onClick={() => setDropdown(!dropdown)} // 드롭다운 상태 업데이트
                            />
                            {dropdown && (
                                <div className="absolute w-36 text-center right-0 mt-4 bg-primary shadow-md rounded-md overflow-hidden z-50">
                                    <Link to={`/myinfo/${memberId}`}>
                                        <Button
                                            text="마이페이지"
                                            className="border-b-2 w-full border-solid rounded-none"
                                        />
                                    </Link>
                                    <Button
                                        onClick={handleLogout}
                                        text="로그아웃"
                                        className="w-full border-solid rounded-none"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/signin">
                            <Button text="로그인" className="rounded-md" />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
