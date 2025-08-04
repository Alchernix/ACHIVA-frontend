"use client";

import { AnimatePresence } from "motion/react";
import {
  BasicInfo,
  EmailValidation,
  ToS,
  Category,
} from "@/features/auth/SignupSteps";
import { useSignupStepStore } from "@/store/SignupStore";

export default function Page() {
  const currentStep = useSignupStepStore.use.currentStep();

  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-full flex flex-col gap-3 items-center justify-start sm:justify-center">
        {currentStep === 0 && <BasicInfo />}
        {currentStep === 1 && <EmailValidation />}
        {currentStep === 2 && <ToS />}
        {currentStep === 3 && <Category />}
      </div>
    </AnimatePresence>
  );
}
