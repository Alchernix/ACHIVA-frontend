import {
  useRef,
  useState,
  useEffect,
  Ref,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
} from "react";
import { NextStepButton } from "./Buttons";
import { useSignupStepStore, useSignupInfoStore } from "@/store/SignupStore";

export default function EmailValidationForm() {
  const email = useSignupInfoStore.use.user().email;

  useEffect(() => {
    async function sendVerificationCode() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/send-verification-code?email=${email}`,
          { method: "POST" }
        );
        if (!response.ok) {
          throw new Error("이메일 검증 중 서버 에러");
        }
        await response.json();
      } catch (err) {
        console.error(err);
        alert(
          "네트워크 혹은 서버 오류가 발생했습니다. 재전송 버튼을 눌러주세요."
        );
      }
    }
    sendVerificationCode();
  }, [email]);

  const handleNextStep = useSignupStepStore.use.handleNextStep();
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/auth/verify-code?email=${email}&code=${code.join("")}`,
        { method: "POST" }
      );
      if (!response.ok) {
        throw new Error("인증번호 검증 중 서버 에러");
      }
      const result = await response.json();
      console.log(result);
      if (result.status === "success") {
        handleNextStep();
      } else {
        alert("인증번호가 틀렸습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("코드가 유효하지 않습니다. 새 코드를 요청하세요.");
    }
    setIsLoading(false);
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
      {error && <p className="text-sm font-light text-theme-red">{error}</p>}
      <NextStepButton
        isLoading={isLoading}
        disabled={code.some((digit) => digit === "")}
      >
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
