import Button from "../components/Common/Button";
import Input from "../components/Form/Input";
import TItle from "../components/Common/Title";
import { useState } from "react";

export default function SignUpPage() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  ///회원가입 함수
  const signup = async (email, password) => {
    const result = await axios.post("", { email, password });
    return result.data;
  };

  ///handleSignUpSubmit( 회원가입을 try 하고 catch 함)
  const handleSignUpSubmit = async () => {
    await signup(value.email, value.password);
  };

  return (
    <div className="w-[520px] h-[900px] pt-28 mx-auto">
      <div className="flex flex-col items-center gap-16 ">
        <TItle tag="h2" className=" w-full" text="이메일로 회원가입" />

        <form onSubmit={handleSignUpSubmit} className="flex flex-col w-full">
          <Input
            value={value.email}
            onChange={(e) => {
              setValue({ ...value, email: e.target.value });
            }}
            type="email"
            text="이메일"
            placeholder="이메일 입력"
            className="mb-6 "
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          <Input
            value={value.password}
            onChange={(e) => {
              setValue({ ...value, password: e.target.value });
            }}
            type="password"
            text="비밀번호"
            placeholder="비밀번호 입력"
            className="mb-6"
            minLength="6"
          />
          <Input
            value={value.password}
            onChange={(e) => {
              setValue({ ...value, password: e.target.value });
            }}
            type="password"
            text="비밀번호"
            placeholder="비밀번호 확인"
            minLength="6"
          />
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
