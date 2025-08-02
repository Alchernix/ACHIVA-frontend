"use client";

import { z } from "zod";
import { InputHTMLAttributes, useState } from "react";
import { UserSchema } from "@/features/auth/schima";

export default function LoginForm() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
    }
  }

  const isInvalid =
    !!errors.email || !enteredValues.password || !!errors.password || isEditing;

  return (
    <form className="flex flex-col gap-2.5 w-full">
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
      <button
        className="font-medium text-white bg-theme rounded-[5px] px-3 py-1.5 disabled:bg-theme-gray"
        disabled={isInvalid}
      >
        로그인
      </button>
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
