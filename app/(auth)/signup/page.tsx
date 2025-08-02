"use client";

import { BasicInfo, EmailValidation } from "@/features/auth/SignupSteps";
import { useSignupStepStore } from "@/store/SignupStore";

export default function Page() {
  const currentStep = useSignupStepStore.use.currentStep();

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      {currentStep === 0 && <BasicInfo />}
      {currentStep === 1 && <EmailValidation />}
    </div>
  );
}
