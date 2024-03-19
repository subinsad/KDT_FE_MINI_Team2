import { Link } from 'react-router-dom';
import Button from '../components/Common/Button.jsx';
import TItle from '../components/Common/Title';
import Input from '../components/Common/Input';

export default function SignInPage() {
    return (
        <div className="w-4/12 mx-auto">
            <div className="flex flex-col items-center gap-16 ">
                <TItle
                    tag="h2"
                    className="font-bold text-2xl w-full"
                    text="이메일로 시작하기"
                />
                <form onSubmit="" className="flex flex-col w-full">
                    <Input
                        type="email"
                        text="아이디"
                        placeholder="아이디 입력"
                        className="mb-6 "
                    />
                    <Input
                        type="password"
                        text="비밀번호"
                        placeholder="비밀번호 입력"
                    />
                </form>

                <div className="flex flex-col items-center w-full ">
                    <Button className="bg-gray-900 mb-4 w-full" text="로그인" />
                    <div className="flex gap-4 font-light">
                        <p>계정이 없으신가요?</p>
                        <Link> 이메일로 회원가입</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
