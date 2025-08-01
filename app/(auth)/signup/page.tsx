import Link from "next/link";
import Container from "@/features/auth/Container";
import { TextLogo } from "@/components/Logo";
import SignupForm from "@/features/auth/SignupForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      {/* h-151 */}
      <Container classes="h-135">
        <TextLogo />
        <SignupForm />
      </Container>
      <Container classes="h-20">
        <p className="text-center flex gap-2">
          <span className="font-light text-center text-black">
            계정이 있으신가요?
          </span>
          <Link href="/login" className="font-semibold text-center text-theme">
            로그인
          </Link>
        </p>
      </Container>
    </div>
  );
}
