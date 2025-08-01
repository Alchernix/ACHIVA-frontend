"use client";
import { useState } from "react";
import { email, z } from "zod";
import { UserSchema } from "./schima";
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export default function SignupForm() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  function handleBlur(
    field: "email" | "password" | "confirmPassword" | "nickname"
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

  return (
    <form className="w-full flex flex-col gap-6" action="">
      <Input
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일"
        value={enteredValues.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEditing(true);
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
            disabled={!enteredValues.email || !!errors.email}
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
          name="nickname"
          type="nickname"
          placeholder="닉네임"
          required
          value={enteredValues.nickname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsEditing(true);
            setEnteredValues((prev) => ({ ...prev, nickname: e.target.value }));
          }}
          onBlur={() => {
            setIsEditing(false);
            handleBlur("nickname");
          }}
          error={!isEditing ? errors.nickname : ""}
          button={
            <Button
              classes="w-20 text-sm text-white disabled:bg-[#e6e6e6] disabled:text-[#a6a6a6]"
              type="button"
              disabled={!enteredValues.nickname || !!errors.nickname}
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
      <Button
        classes="w-full px-3 py-1.5 disabled:bg-theme-gray"
        disabled={
          // 하나라도 빈 칸 있거나
          !Object.values(enteredValues).every((v) => v.trim() !== "") ||
          // 편집 중이거나
          isEditing ||
          // 에러가 하나라도 있으면
          Object.values(errors).some((e) => e !== "")
        }
      >
        가입하기
      </Button>
    </form>
  );
}

type ButtonProps = {
  classes: string; // width, disabled 시 설정 필요
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ classes, children, ...props }: ButtonProps) {
  return (
    <button className={`text-white rounded-sm ${classes} bg-theme`} {...props}>
      {children}
    </button>
  );
}

type InputProps = {
  label?: string;
  name: string;
  error: string;
  button?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ label, name, button, error, ...props }: InputProps) {
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
          }`}
          name={name}
          {...props}
        />
        {button}
      </div>
      <p className="text-theme-red text-xs font-light">{error}</p>
    </div>
  );
}
