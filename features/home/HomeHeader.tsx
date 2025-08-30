import Link from "next/link";
import { TextLogo } from "@/components/Logo";

export default function HomeHeader() {
  return (
    <>
      <div className="px-5 sm:px-0">
        <div className="flex sm:hidden pt-5">
          <TextLogo />
        </div>
        <Link
          href={"/post/create"}
          className="flex items-center justify-center py-3 gap-6 w-full bg-theme rounded-md mt-5 mb-3 sm:mt-10 sm:mb-8"
        >
          <p className="text-lg font-medium text-white">
            오늘의 새로운 이야기를 남겨주세요
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.375 0.75H2.625C2.12772 0.75 1.65081 0.947544 1.29917 1.29917C0.947544 1.65081 0.75 2.12772 0.75 2.625V21.375C0.75 21.8723 0.947544 22.3492 1.29917 22.7008C1.65081 23.0525 2.12772 23.25 2.625 23.25H21.375C21.8723 23.25 22.3492 23.0525 22.7008 22.7008C23.0525 22.3492 23.25 21.8723 23.25 21.375V2.625C23.25 2.12772 23.0525 1.65081 22.7008 1.29917C22.3492 0.947544 21.8723 0.75 21.375 0.75ZM21.375 21.375H2.625V2.625H21.375V21.375ZM17.625 12C17.625 12.2486 17.5262 12.4871 17.3504 12.6629C17.1746 12.8387 16.9361 12.9375 16.6875 12.9375H12.9375V16.6875C12.9375 16.9361 12.8387 17.1746 12.6629 17.3504C12.4871 17.5262 12.2486 17.625 12 17.625C11.7514 17.625 11.5129 17.5262 11.3371 17.3504C11.1613 17.1746 11.0625 16.9361 11.0625 16.6875V12.9375H7.3125C7.06386 12.9375 6.8254 12.8387 6.64959 12.6629C6.47377 12.4871 6.375 12.2486 6.375 12C6.375 11.7514 6.47377 11.5129 6.64959 11.3371C6.8254 11.1613 7.06386 11.0625 7.3125 11.0625H11.0625V7.3125C11.0625 7.06386 11.1613 6.8254 11.3371 6.64959C11.5129 6.47377 11.7514 6.375 12 6.375C12.2486 6.375 12.4871 6.47377 12.6629 6.64959C12.8387 6.8254 12.9375 7.06386 12.9375 7.3125V11.0625H16.6875C16.9361 11.0625 17.1746 11.1613 17.3504 11.3371C17.5262 11.5129 17.625 11.7514 17.625 12Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>

      <HomeSectionHeader>나를 응원해준 사람들의 이야기</HomeSectionHeader>
    </>
  );
}

export function HomeSectionHeader({ children }: { children: string }) {
  return (
    <div className="px-5 sm:px-0 font-semibold text-xl sticky top-0 bg-white z-10 text-theme py-2">
      {children}
    </div>
  );
}
