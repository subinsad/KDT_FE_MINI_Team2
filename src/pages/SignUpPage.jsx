import Button from "../components/Common/Button";
import Input from "../components/Form/Input";
import TItle from "../components/Common/Title";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    error: "",
  });

  // // 이메일 정규식
  // const emailReg =
  //   /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // // 패스워드 정규식
  // const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  // const emailCheck = (email) => {
  //   if (email.match(emailReg) === null) {
  //     alert("이메일 형식이 올바르지 않습니다.");
  //   }
  // };

  // const passwordCheck = (password) => {
  //   if (password.match(passwordReg) === null) {
  //     alert("비밀번호 형식이 올바르지 않습니다.");
  //   }
  // };

  // const passwordDoubleCheck = (password, passwordConfirm) => {
  //   if (password !== passwordConfirm) {
  //     alert("비밀번호가 일치하지 않습니다.");
  //   }
  // };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/public-api/v1/member/join", {
        email: "aaaaa@aaa.com",
        password: "asdf123!",
        name: "test",
        phoneNumber: "010-1234-1234",
      });
      console.log(response); // 응답 로깅
      return response; // 응답 객체 반환
    } catch (error) {
      console.log(error); // 에러 로깅
      return error.response; // 에러 응답 반환
    }
  };

  return (
    <div className="w-[520px] mt-28 mx-auto">
      <div className="flex flex-col items-center gap-16 ">
        <TItle tag="h2" className=" w-full" text="이메일로 회원가입" />

        <form onSubmit={signUpHandler} className="flex flex-col w-full">
          <Input
            value={values.email}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
            // onBlur={(e) => {
            //   emailCheck(e.target.value);
            // }}
            type="email"
            text="이메일"
            placeholder="이메일 입력"
            className="mb-6 "
          />
          <Input
            value={values.password}
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
            // onBlur={(e) => {
            //   passwordCheck(e.target.value, values.password);
            // }}
            type="password"
            text="비밀번호"
            placeholder="비밀번호 입력"
            className="mb-6"
          />
          <Input
            value={values.passwordConfirm}
            onChange={(e) => {
              setValues({ ...values, passwordConfirm: e.target.value });
            }}
            // onBlur={(e) => {
            //   passwordDoubleCheck(e.target.value, values.password);
            // }}
            type="password"
            text="비밀번호 확인"
            placeholder="비밀번호 확인"
          />

          <Button
            className="bg-gray-900 text-white mt-16 w-full"
            text="회원가입"
          />
        </form>
      </div>
    </div>
  );
}
