// import React, { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Button from "../components/Common/Button";
// import { useUser } from "../store/user"; // Zustand 스토어 사용
// import { useCookies } from "react-cookie";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { FaUserCircle } from "react-icons/fa";
// import logo from "../img/logo.svg";
// import CartStatus from "../components/CartComponent/CartStatus";
// import useCartStore from "../store/cart";

// export default function Gnb() {
//   const navigate = useNavigate();
//   const { loginUser, memberId, logout } = useUser(); // Zustand 스토어에서 상태와 함수 사용
//   const isAuthenticated = Boolean(loginUser); // 로그인 상태 확인
//   const [, , removeCookie] = useCookies(["secretKey", "memberId"]); // useCookies 훅 사용
//   const [dropdown, setDropdown] = useState(false); // 드롭다운 상태
//   const [cookies] = useCookies(["secretKey"]);
//   const cartCount = useCartStore((state) => state.cartCount);
//   const fetchCartCount = useCartStore((state) => state.fetchCartCount);

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     // 외부 클릭 감지 함수
//     function handleOutsideClick(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdown(false);
//       }
//     }

//     // 이벤트 리스너 등록
//     document.addEventListener("mousedown", handleOutsideClick);

//     // 컴포넌트 언마운트 시 이벤트 리스너 제거
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [dropdown]); // dropdown 상태에 따라 effect 실행

//   useEffect(() => {
//     if (cookies.secretKey) {
//       fetchCartCount(cookies.secretKey);
//     }
//   }, [cookies.secretKey, fetchCartCount]);

//   const handleLogout = () => {
//     logout(); // Zustand를 통해 로그아웃 처리
//     removeCookie("secretKey", { path: "/" }); // secretKey 쿠키 삭제
//     removeCookie("memberId", { path: "/" }); // memberId 쿠키 삭제
//     navigate("/signin"); // 로그인 페이지로 리디렉션
//   };

//   //눌렀을 때 메인페이지의 최상단으로 스크롤
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <header className="py-5 px-4 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50">
//       <div className="max-w-mw mx-auto flex items-center justify-between">
//         <Link
//           to="/"
//           onClick={scrollToTop}
//           className="text-3xl font-bold text-primary"
//         >
//           <img
//             src={logo}
//             alt="Slide 1"
//             className="w-full h-full object-cover"
//           />
//         </Link>
//         <nav className="flex items-center gap-8 font-semibold">
//           <Link to="/notice"> 공지사항 </Link>

//           <Link to="/admin"> 관리자페이지 </Link>
//           {isAuthenticated ? (
//             <div className="flex items-center gap-8">
//               <Link to="/cart">
//                 <CartStatus cartCount={cartCount} />
//               </Link>

//               <div className="relative" ref={dropdownRef}>
//                 <Button
//                   className="flex gap-3 rounded-md"
//                   text={
//                     <>
//                       <RxHamburgerMenu />
//                       <FaUserCircle />
//                     </>
//                   }
//                   onClick={() => setDropdown(!dropdown)} // 드롭다운 상태 업데이트
//                 />
//                 {dropdown && (
//                   <div className="absolute w-36 text-center right-0 mt-4 bg-primary shadow-md rounded-md overflow-hidden z-50">
//                     <Link to={`/myinfo/${memberId}`}>
//                       <Button
//                         text="마이페이지"
//                         className="border-b-2 w-full border-solid rounded-none"
//                       />
//                     </Link>
//                     <Button
//                       onClick={handleLogout}
//                       text="로그아웃"
//                       className="w-full border-solid rounded-none"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <Link to="/signin">
//               <Button text="로그인" className="rounded-md" />
//             </Link>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import { useUser } from "../store/user"; // Zustand 스토어 사용
import { useCookies } from "react-cookie";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import logo from "../img/logo.svg";
import CartStatus from "../components/CartComponent/CartStatus";
import useCartStore from "../store/cart";
import { GrClose } from "react-icons/gr";

export default function Gnb() {
  const navigate = useNavigate();
  const { loginUser, memberId, setRole, logout } = useUser(); // Zustand 스토어에서 상태와 함수 사용
  const isAuthenticated = Boolean(loginUser); // 로그인 상태 확인
  const [, , removeCookie] = useCookies(["secretKey", "memberId", "role"]); // useCookies 훅 사용
  const [dropdown, setDropdown] = useState(false); // 드롭다운 상태
  const [cookies] = useCookies(["secretKey"]);
  const cartCount = useCartStore((state) => state.cartCount);
  const fetchCartCount = useCartStore((state) => state.fetchCartCount);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // 쿠키에서 role을 읽고 Zustand 스토어에 설정
    if (cookies.role) {
      setRole(cookies.role);
    }
  }, [cookies.role, setRole]);

  const isAdmin = cookies.role === "ADMIN";

  useEffect(() => {
    // 외부 클릭 감지 함수
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleOutsideClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdown]); // dropdown 상태에 따라 effect 실행

  useEffect(() => {
    if (cookies.secretKey) {
      fetchCartCount(cookies.secretKey);
    }
  }, [cookies.secretKey, fetchCartCount]);

  const handleLogout = () => {
    logout(); // Zustand를 통해 로그아웃 처리
    removeCookie("secretKey", { path: "/" }); // secretKey 쿠키 삭제
    removeCookie("memberId", { path: "/" }); // memberId 쿠키 삭제
    removeCookie("role", { path: "/" }); // role 쿠키 삭제
    navigate("/signin"); // 로그인 페이지로 리디렉션
  };

  //눌렀을 때 메인페이지의 최상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showMobileMenu = () => {
    setMobileMenu(true);
  };

  const hideMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>
      <header className="py-5 px-4 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50 hidden medium:block">
        <div className="max-w-mw mx-auto flex items-center justify-between">
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-3xl font-bold text-primary"
          >
            <img
              src={logo}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </Link>
          <nav className="flex items-center gap-8 font-semibold">
            <Link to="/notice"> 공지사항 </Link>
            {isAdmin && <Link to="/admin">관리자페이지</Link>}

            {isAuthenticated ? (
              <div className="flex items-center gap-8">
                <Link to="/cart">
                  <CartStatus cartCount={cartCount} />
                </Link>

                <div className="relative" ref={dropdownRef}>
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
              </div>
            ) : (
              <Link to="/signin">
                <Button text="로그인" className="rounded-md" />
              </Link>
            )}
          </nav>
        </div>
      </header>
      <header className="py-5 px-4 sticky top-0 bg-white border-b-2 border-gray-200 border-solid z-50 medium:hidden">
        <div className="max-w-mw mx-auto flex items-center justify-between">
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-3xl font-bold text-primary"
          >
            <img
              src={logo}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Link to="/cart">
                <CartStatus cartCount={cartCount} />
              </Link>
            )}

            <Button
              onClick={showMobileMenu}
              className="rounded-md w-10"
              text={
                <>
                  <RxHamburgerMenu className="translate-x-[-4px]" />
                </>
              }
            />
          </div>
        </div>
      </header>
      {mobileMenu && (
        <nav className="flex flex-col items-center gap-8 w-full h-full justify-center font-semibold p-4 bg-white fixed top-0 z-50">
          <div className="flex flex-col items-center gap-8">
            <Button
              onClick={hideMobileMenu}
              className="absolute top-5 right-4 rounded-md w-10"
              text={
                <>
                  <GrClose className="translate-x-[-4px]" />
                </>
              }
            />
            {isAuthenticated ? (
              <>
                <Link to="/notice"> 공지사항 </Link>
                {isAdmin && <Link to="/admin">관리자페이지</Link>}
                <Link to={`/myinfo/${memberId}`}> 마이페이지 </Link>
                <Button
                  onClick={handleLogout}
                  text="로그아웃"
                  className="w-full border-solid"
                />
              </>
            ) : (
              <>
                <Link to="/signin"> 로그인 </Link>
                <Link to="/notice"> 공지사항 </Link>
                <Link to="/admin"> 관리자페이지 </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
