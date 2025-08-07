"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormEvent, InputHTMLAttributes, useState } from "react";
import { UserSchema } from "@/features/auth/schima";
import { NextStepButton } from "./Buttons";

export default function LoginForm() {
  const router = useRouter();
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleBlur(field: "email" | "password") {
    if (field === "email") {
      const schema = UserSchema.pick({ [field]: true });
      const payload = { [field]: enteredValues[field] };
      const result = schema.safeParse(payload);
      if (!result.success) {
        const { fieldErrors } = z.flattenError(result.error);
        setErrors({
          ...errors,
          [field]: fieldErrors.email?.[0] || "",
        });
      } else {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    } else {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 쿠키 저장
        body: JSON.stringify({
          email: enteredValues.email,
          password: enteredValues.password,
        }),
      });
      if (response.ok) {
        router.replace("/");
      } else if (response.status === 401) {
        setErrors({
          ...errors,
          password: "잘못된 비밀번호입니다. 다시 확인하세요.",
        });
      } else {
        alert("서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (err) {
      alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  const isInvalid =
    !!errors.email || !enteredValues.email || !enteredValues.password;

  return (
    <form className="flex flex-col gap-2.5 w-full" onSubmit={handleLogin}>
      <Input
        placeholder="이메일 입력"
        type="email"
        value={enteredValues.email}
        name="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEditing(true);
          setEnteredValues((prev) => ({ ...prev, email: e.target.value }));
        }}
        onBlur={() => {
          setIsEditing(false);
          handleBlur("email");
        }}
        required
        error={!isEditing ? errors.email : ""}
      />
      <Input
        placeholder="비밀번호 입력"
        type="password"
        name="password"
        value={enteredValues.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEditing(true);
          setEnteredValues((prev) => ({ ...prev, password: e.target.value }));
        }}
        onBlur={() => {
          setIsEditing(false);
          handleBlur("password");
        }}
        required
        error={!isEditing ? errors.password : ""}
      />
      {/* <button
        className="font-medium text-white bg-theme rounded-[5px] px-3 py-1.5 disabled:bg-theme-gray"
        disabled={isInvalid}
      >
        로그인
      </button> */}
      <NextStepButton disabled={isInvalid} isLoading={isLoading}>
        로그인
      </NextStepButton>
    </form>
  );
}

type InputProps = {
  error: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ error, ...props }: InputProps) {
  return (
    <div>
      <input
        className={`text-sm w-full border ${
          error ? "border-theme-red" : "border-theme-gray"
        } rounded-[5px] px-3 py-2 placeholder:text-theme-gray placeholder:font-light`}
        {...props}
      />
      <p className="mt-0.5 text-theme-red text-xs font-light">{error}</p>
    </div>
  );
}
