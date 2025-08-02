import {
  useRef,
  useState,
  Ref,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from "react";
import { NextStepButton } from "./Buttons";

export default function EmailValidationForm() {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
    setCode((prev) =>
      prev.map((v, i) => {
        if (i === idx) {
          return e.target.value;
        } else {
          return v;
        }
      })
    );
    if (e.target.value !== "") {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handleBack(e: KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key !== "Backspace") return;

    // 1) 현재 칸에 값이 있으면, 지우고 커서 이동 막기
    if (code[idx] !== "") {
      e.preventDefault(); // 브라우저 기본 Backspace 동작 막고
      const newCode = [...code];
      newCode[idx] = "";
      setCode(newCode);
      return;
    }

    // 2) 이미 빈 칸이면 이전 인풋으로 포커스
    inputRefs.current[idx - 1]?.focus();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className="w-full flex flex-col gap-7" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        {code.map((digit, idx) => (
          <Input
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            key={idx}
            value={digit}
            handleChange={(e) => handleChange(e, idx)}
            handleBack={(e) => handleBack(e, idx)}
          />
        ))}
      </div>
      <NextStepButton disabled={code.some((digit) => digit === "")}>
        인증하기
      </NextStepButton>
    </form>
  );
}

type InputProps = {
  value: string | undefined;
  ref: Ref<HTMLInputElement>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBack: (e: KeyboardEvent<HTMLInputElement>) => void;
};

function Input({ value, ref, handleChange, handleBack }: InputProps) {
  return (
    <input
      ref={ref}
      min="0"
      max="9"
      type="number"
      value={value}
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => handleBack(e)}
      className={`h-20 text-center flex-1 min-w-0 text-2xl rounded-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
        value === null || value === undefined || value === ""
          ? "bg-[#f2f2f2] border border-[#d8d8d8]"
          : "border border-theme"
      }`}
    />
  );
}
