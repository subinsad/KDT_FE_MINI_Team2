import Button from "../components/Common/Button";
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  //눌렀을 때 메인페이지의 최상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-10 border-t-2 border-gray-200 border-solid">
      <div className="max-w-mw mx-auto">
        <div>
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-3xl font-bold text-gray-500 grayscale opacity-70"
          >
            <img src={logo} alt="Slide 1" className="object-cover" />
          </Link>
        </div>

        <div className="flex justify-between  gap-16">
          <div className="mt-5">
            <h3 className="mt-3 text-lg font-semibold ">FE Mini Team2</h3>
            <ul className="text-lg mt-2 text-slate-700">
              <li className="mb-1">SignUp / SignIn</li>
              <li className="mb-1">Mypage</li>
              <li className="mb-1">Listpage</li>
              <li className="mb-1">Detailpage</li>
              <li className="mb-1">Reservation</li>
              <li className="mb-1">filter absence items</li>
              <li className="mb-1">Logout</li>
            </ul>
          </div>

          <div className="mt-5">
            <h3 className="mt-3 text-lg font-semibold ">Proud Things</h3>
            <ul className="text-lg mt-2 text-slate-700">
              <li className="mb-1">JSON Web Token</li>
              <li className="mb-1">Advanced Pagination</li>
              <li className="mb-1">Dynamic Sliders</li>
              <li className="mb-1">Skeleton Screens</li>
              <li className="mb-1">Loading Spinners</li>
              <li className="mb-1">Chakra UI Modals</li>
              <li className="mb-1">Animation Integration</li>
            </ul>
          </div>

          <div className="mt-5">
            <h3 className="mt-3 text-lg font-semibold ">
              Frontend Technologies
            </h3>
            <ul className="text-lg mt-2 text-slate-700">
              <li className="mb-1">React(JS)</li>
              <li className="mb-1">Zustand</li>
              <li className="mb-1">Tailwind CSS</li>
            </ul>
            <h3 className="mt-3 text-lg font-semibold ">
              Backend Technologies
            </h3>
            <ul className="text-lg mt-2 text-slate-700">
              <li className="mb-1">JAVA</li>
              <li className="mb-1">Spring</li>
            </ul>
          </div>
          <div className="mt-5">
            <h3 className="mt-3 text-lg font-semibold ">Frontend Members</h3>
            <ul className="text-lg mt-2 text-slate-700">
              <li className="mb-1">
                <a
                  href="https://github.com/subinsad"
                  className="flex items-center gap-1"
                >
                  Soobin Park
                  <FaGithub />
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://github.com/JeonYooDeok"
                  className="flex items-center gap-1"
                >
                  Yudeok Jeon
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mj950313"
                  className="flex items-center gap-1"
                >
                  Minjae Kim
                  <FaGithub />
                </a>
              </li>
            </ul>

            <h3 className="mt-3 text-lg font-semibold ">Backend Members</h3>
            <ul className="text-lg mt-2 text-slate-700">
              <li className="mb-1">
                <a
                  href="https://github.com/Woohahalife"
                  className="flex items-center gap-1"
                >
                  Geon Choi
                  <FaGithub />
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="https://github.com/asd42270"
                  className="flex items-center gap-1"
                >
                  Yubin Lee
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
