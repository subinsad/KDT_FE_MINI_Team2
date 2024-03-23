import Button from "../components/Common/Button";
import Input from "../components/Form/Input";
import Title from "../components/Common/Title";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";

export default function SignUpPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phoneNumber: "",
  });
  const [showPswd, setShowPswd] = useState(false);

  const toggleShowPswd = () => {
    setShowPswd(!showPswd);
  };
  const navigate = useNavigate();

  // 이메일 정규식
  const emailReg =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  // 패스워드 정규식
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  // 이름 정규식
  const nameReg = /^[가-힣]{2,10}$/;
  // 전화번호 정규식
  const phoneNumberReg = /^010-?\d{4}-?\d{4}$/;

  const handleValidation = (field, value) => {
    let errorMsg = "";
    switch (field) {
      case "email":
        errorMsg = emailReg.test(value)
          ? ""
          : "이메일 형식이 올바르지 않습니다.";
        break;
      case "password":
        errorMsg = passwordReg.test(value)
          ? ""
          : "비밀번호 형식이 올바르지 않습니다.";
        break;
      case "passwordConfirm":
        errorMsg =
          values.password === value ? "" : "비밀번호가 일치하지 않습니다.";
        break;
      case "name":
        errorMsg = nameReg.test(value) ? "" : "이름 형식이 올바르지 않습니다.";
        break;
      case "phoneNumber":
        errorMsg = phoneNumberReg.test(value)
          ? ""
          : "전화번호 형식이 올바르지 않습니다.";
        break;
      default:
        break;
    }
    setMessage((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/public-api/v1/member/join", {
        email: values.email,
        password: values.password,
        name: values.name,
        phoneNumber: values.phoneNumber,
      });
      navigate("/");
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        if (errorMessage === "가입된 이메일이 이미 존재합니다.") {
          setMessage((prev) => ({
            ...prev,
            email: "이미 가입된 이메일입니다.",
          }));
        }
      }
    }
  };

  return (
    <div className="w-[520px] mt-28 mx-auto">
      <div className="flex flex-col items-center gap-16 ">
        <Title tag="h2" className=" w-full" text="이메일로 회원가입" />

        <form onSubmit={signUpHandler} className="flex flex-col w-full">
          <div className="flex flex-col w-full mb-6">
            <Input
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
              onBlur={(e) => {
                handleValidation("email", e.target.value);
              }}
              type="email"
              text="이메일"
              placeholder="이메일 입력"
            />
            {message.email && (
              <p className="text-red-500 mt-3">{message.email}</p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <div className="flex flex-col w-full relative">
              <Input
                value={values.password}
                onChange={(e) => {
                  setValues({ ...values, password: e.target.value });
                }}
                onBlur={(e) => {
                  handleValidation("password", e.target.value);
                }}
                type={showPswd ? "text" : "password"}
                text="비밀번호"
                placeholder="비밀번호 입력"
              />
              <button
                type="button"
                onClick={toggleShowPswd}
                className="absolute right-3 top-[34px] text-2xl"
              >
                {showPswd ? <BiShow /> : <BiHide />}
              </button>
            </div>

            {message.password && (
              <p className="text-red-500 mt-3">{message.password}</p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <div className="flex flex-col w-full relative">
              <Input
                value={values.passwordConfirm}
                onChange={(e) => {
                  setValues({ ...values, passwordConfirm: e.target.value });
                }}
                onBlur={(e) => {
                  handleValidation("passwordConfirm", e.target.value);
                }}
                type={showPswd ? "text" : "password"}
                text="비밀번호 확인"
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                onClick={toggleShowPswd}
                className="absolute right-3 top-[34px] text-2xl"
              >
                {showPswd ? <BiShow /> : <BiHide />}
              </button>
            </div>
            {message.passwordConfirm && (
              <p className="text-red-500 mt-3">{message.passwordConfirm}</p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <Input
              value={values.name}
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
              }}
              onBlur={(e) => {
                handleValidation("name", e.target.value);
              }}
              type="name"
              text="이름"
              placeholder="이름을 입력해주세요"
            />
            {message.name && (
              <p className="text-red-500 mt-3">{message.name}</p>
            )}
          </div>

          <div className="flex flex-col w-full mb-6">
            <Input
              value={values.phoneNumber}
              onChange={(e) => {
                setValues({ ...values, phoneNumber: e.target.value });
              }}
              onBlur={(e) => {
                handleValidation("phoneNumber", e.target.value);
              }}
              type="phoneNumber"
              text="전화번호"
              placeholder="휴대폰 번호 입력"
            />
            {message.phoneNumber && (
              <p className="text-red-500 mt-3">{message.phoneNumber}</p>
            )}
          </div>

          <Button
            className="bg-gray-900 text-white mt-10 w-full"
            text="회원가입"
          />
        </form>
      </div>
    </div>
  );
}
