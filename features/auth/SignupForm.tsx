"use client";
import { useState, FormEvent } from "react";
import { z } from "zod";
import { UserSchema } from "./schima";
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { useSignupStepStore, useSignupInfoStore } from "@/store/SignupStore";
import { NextStepButton } from "./Buttons";
import { LoadingIcon } from "@/components/Icons";

export default function SignupForm() {
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [isEmailCheckLoading, setIsEmailCheckLoding] = useState(false);
  const [isNickNameOk, setIsNickNameOk] = useState(false);
  const [isNickNameCheckLoading, setIsNickNameCheckLoding] = useState(false);

  const handleNextStep = useSignupStepStore.use.handleNextStep();
  const setUser = useSignupInfoStore.use.setUser();
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
  });

  function handleBlur(
    field: "email" | "password" | "confirmPassword" | "nickName"
  ) {
    if (field === "confirmPassword") {
      if (enteredValues.password !== enteredValues.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        });
      } else {
        setErrors({
          ...errors,
          confirmPassword: "",
        });
      }
    } else {
      const schema = UserSchema.pick({ [field]: true });
      const payload = { [field]: enteredValues[field] };
      const result = schema.safeParse(payload);
      if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        setErrors({
          ...errors,
          [field]: fieldErrors[field]?.[0] || "",
        });
      } else {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    }
  }

  async function handleCheckEmail() {
    setIsEmailCheckLoding(true);
    try {
      // console.log(
      //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/check-email?email=${enteredValues.email}`
      // );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/check-email?email=${enteredValues.email}`
      );
      if (!response.ok) {
        throw new Error("이메일 중복 체크 중 서버 에러");
      }
      const { data } = await response.json();
      const isAvailable = data.available;
      if (isAvailable) {
        setIsEmailOk(true);
      } else {
        setErrors({
          ...errors,
          email: "사용할 수 없는 이메일입니다.",
        });
      }
    } catch (err) {
      console.error(err);
      alert(
        "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsEmailCheckLoding(false);
    }
  }

  async function handleCheckNickName() {
    setIsNickNameCheckLoding(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/check-nickname?nickname=${enteredValues.nickName}`
      );
      if (!response.ok) {
        throw new Error("닉네임 중복 체크 중 서버 에러");
      }
      const { data } = await response.json();
      const isAvailable = data.available;
      if (isAvailable) {
        setIsNickNameOk(true);
      } else {
        setErrors({
          ...errors,
          nickName: "사용할 수 없는 닉네임입니다.",
        });
      }
    } catch (err) {
      console.error(err);
      alert(
        "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsNickNameCheckLoding(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser({
      email: enteredValues.email,
      password: enteredValues.password,
      nickName: enteredValues.nickName,
    });
    handleNextStep();
  }

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      <Input
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일"
        value={enteredValues.email}
        isAvailable={isEmailOk ? "사용할 수 있는 이메일입니다." : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEditing(true);
          setIsEmailOk(false);
          setEnteredValues((prev) => ({ ...prev, email: e.target.value }));
        }}
        onBlur={() => {
          setIsEditing(false);
          handleBlur("email");
        }}
        error={!isEditing ? errors.email : ""}
        required
        button={
          <Button
            onClick={handleCheckEmail}
            disabled={!enteredValues.email || !!errors.email}
            isLoading={isEmailCheckLoading}
            classes="w-20 text-sm text-white disabled:bg-[#e6e6e6] disabled:text-[#a6a6a6]"
            type="button"
          >
            중복확인
          </Button>
        }
      />
      <div className="flex flex-col gap-2">
        <Input
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={enteredValues.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsEditing(true);
            setEnteredValues((prev) => ({ ...prev, password: e.target.value }));
          }}
          onBlur={() => {
            setIsEditing(false);
            handleBlur("password");
          }}
          error={!isEditing ? errors.password : ""}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          required
          value={enteredValues.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsEditing(true);
            setEnteredValues((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }));
          }}
          onBlur={() => {
            setIsEditing(false);
            handleBlur("confirmPassword");
          }}
          error={!isEditing ? errors.confirmPassword : ""}
        />
        <p className="font-light text-xs text-theme-gray">
          8~20자/ 영문, 숫자, 특수문자 포함
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="닉네임"
          name="nickName"
          type="nickName"
          placeholder="닉네임"
          required
          value={enteredValues.nickName}
          isAvailable={isNickNameOk ? "사용할 수 있는 닉네임입니다." : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsEditing(true);
            setIsNickNameOk(false);
            setEnteredValues((prev) => ({ ...prev, nickName: e.target.value }));
          }}
          onBlur={() => {
            setIsEditing(false);
            handleBlur("nickName");
          }}
          error={!isEditing ? errors.nickName : ""}
          button={
            <Button
              onClick={handleCheckNickName}
              classes="w-20 text-sm text-white disabled:bg-[#e6e6e6] disabled:text-[#a6a6a6]"
              type="button"
              isLoading={isNickNameCheckLoading}
              disabled={!enteredValues.nickName || !!errors.nickName}
            >
              중복확인
            </Button>
          }
        />
        <p className="font-light text-xs text-theme-gray">
          2자 이상 15자 이하
          <br />
          영문 소문자·대문자, 숫자, 밑줄(_) 사용 가능
        </p>
      </div>
      <NextStepButton
        disabled={
          // 하나라도 빈 칸 있거나
          !Object.values(enteredValues).every((v) => v.trim() !== "") ||
          // 편집 중이거나
          isEditing ||
          // 에러가 하나라도 있으면
          Object.values(errors).some((e) => e !== "") ||
          // 이메일이나 닉네임이 중복이거나 아직 중복체크를 하지 않았으면
          !isEmailOk ||
          !isNickNameOk
        }
      >
        가입하기
      </NextStepButton>
    </form>
  );
}

type ButtonProps = {
  classes: string; // width, disabled 시 설정 필요
  children: React.ReactNode;
  isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ classes, children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center text-white rounded-sm ${classes} bg-theme`}
      {...props}
    >
      {isLoading ? <LoadingIcon /> : children}
    </button>
  );
}

type InputProps = {
  label?: string;
  name: string;
  error: string;
  button?: ReactNode;
  isAvailable?: string; // 이메일, 닉네임 사용가능 시 클래스 위해
} & InputHTMLAttributes<HTMLInputElement>;

function Input({
  label,
  name,
  button,
  error,
  isAvailable = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-theme-gray" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          className={`flex-1 min-w-0 text-sm bg-[#f2f2f2] rounded-sm placeholder:text-[#b3b3b3] px-3 py-2 ${
            error ? "border border-theme-red" : ""
          } ${isAvailable ? "border border-[#29cc52]" : ""}`}
          name={name}
          {...props}
        />
        {button}
      </div>
      {error && <p className="text-theme-red text-xs font-light">{error}</p>}
      {isAvailable && (
        <p className="text-[#29cc52] text-xs font-light">{isAvailable}</p>
      )}
    </div>
  );
}
