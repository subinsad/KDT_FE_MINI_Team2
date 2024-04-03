import Button from '../components/Common/Button';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';
import { FaGithub } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FaAws } from 'react-icons/fa';

export default function Footer() {
    //눌렀을 때 메인페이지의 최상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="py-10 border-t-2 border-gray-200 border-solid bg-gray-200">
            <div className="flex flex-col items-center  max-w-mw mx-auto">
                <Link
                    to="/"
                    onClick={scrollToTop}
                    className="flex flex-col items-center gap-2 mb-2 text-xl ">
                    <img
                        src={logo}
                        alt="Slide 1"
                        className="object-cover w-28 grayscale opacity-70 "
                    />
                    {/* <h3 className="text-sm font-bold text-primary">
                        Mini Team2
                    </h3> */}
                </Link>
                {/* <h3 className="flex gap-4 items-center mt-3 text-lg font-semibold ">
                    <FaGithub /> GITGUB
                </h3> */}
                <ul className="flex items-center gap-4 text-base mt-2 text-gray-500 font-medium">
                    <li>
                        <a
                            href="https://github.com/subinsad"
                            className="flex items-center gap-1">
                            Subin Park
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/JeonYooDeok"
                            className="flex items-center gap-1">
                            Yudeok Jeon
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/mj950313"
                            className="flex items-center gap-1">
                            Minjae Kim
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/Woohahalife"
                            className="flex items-center gap-1">
                            Geon Choi
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/asd42270"
                            className="flex items-center gap-1">
                            Yubin Lee
                        </a>
                    </li>
                </ul>

                <ul className="flex gap-2 mt-5">
                    <li className="border border-gray-400 border-solid p-2 rounded-full hover:bg-white ">
                        <FaReact />
                    </li>
                    <li className="border border-gray-400 border-solid p-2 rounded-full hover:bg-white ">
                        <SiTailwindcss />
                    </li>
                    <li className="border border-gray-400 border-solid p-2 rounded-full hover:bg-white ">
                        <FaJava />
                    </li>
                    <li className="border border-gray-400 border-solid p-2 rounded-full hover:bg-white ">
                        <FaAws />
                    </li>
                </ul>
                <div className="text-center mt-5 italic  text-xs">
                    copylight 2024. <br />
                    FastCampus Mini Project Team2
                </div>
            </div>
        </footer>
    );
}
