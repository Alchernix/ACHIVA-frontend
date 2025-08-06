"use client";

import { AnimatePresence } from "motion/react";
import {
  BasicInfo,
  EmailValidation,
  ToS,
  Category,
  Birthday,
  Oath,
} from "@/features/auth/SignupSteps";
import { useSignupStepStore } from "@/store/SignupStore";

export default function Page() {
  const currentStep = useSignupStepStore.use.currentStep();

  return (
    <AnimatePresence mode="wait">
      <div className="w-full min-h-dvh flex flex-col gap-3 items-center pt-15 sm:pt-0 justify-start sm:justify-center">
        {currentStep === 0 && <BasicInfo />}
        {currentStep === 1 && <EmailValidation />}
        {currentStep === 2 && <ToS />}
        {currentStep === 3 && <Category />}
        {currentStep === 4 && <Birthday />}
        {currentStep === 5 && <Oath />}
      </div>
    </AnimatePresence>
  );
}
