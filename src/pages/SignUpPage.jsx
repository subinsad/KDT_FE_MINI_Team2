import Button from "../components/Common/Button";
import Input from "../components/Form/Input";
import TItle from "../components/Common/Title";

export default function SignUpPage() {
  return (
    <div className="w-[520px] h-[900px] pt-28 mx-auto">
      <div className="flex flex-col items-center gap-16 ">
        <TItle tag="h2" className=" w-full" text="이메일로 회원가입" />

        <form onSubmit="" className="flex flex-col w-full">
          <Input
            type="email"
            text="이메일"
            placeholder="이메일 입력"
            className="mb-6 "
          />
          <Input
            type="password"
            text="비밀번호"
            placeholder="비밀번호 입력"
            className="mb-6 "
          />
          <Input type="password" text="비밀번호" placeholder="비밀번호 확인" />
        </form>

        <div className="flex flex-col items-center w-full ">
          <Button
            className="bg-gray-900 text-white mb-4 w-full"
            text="회원가입"
          />
        </div>
      </div>
    </div>
  );
}
