import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="h-full bg-theme flex flex-col items-center p-10">
      <div className="my-auto">
        <h1 className="w-[196px] h-[55px] text-[40px] font-bold text-center text-white">
          ACHIVA
        </h1>
        <div className="w-[196px] h-[65px] text-xl font-thin text-center text-white">
          <p>성취를 나누고 응원하는</p>
          <p>새로운 공간</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-[359px] relative gap-5">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
          <button className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[46px] gap-2.5 px-[93px] py-2.5 rounded-[5px] border border-white/50">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
              <GoogleIcon />
              <p className="flex-grow-0 flex-shrink-0 w-[139px] h-[25px] opacity-[0.85] text-lg font-light text-center text-white">
                구글로 시작하기
              </p>
            </div>
          </button>
          <button className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[46px] gap-2.5 px-[93px] py-2.5 rounded-[5px] border border-white/50">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative opacity-[0.85]">
              <AppleIcon />
              <p className="flex-grow-0 flex-shrink-0 w-[139px] h-[25px] text-lg font-light text-center text-white">
                애플로 시작하기
              </p>
            </div>
          </button>
          <Link
            href="/signup"
            className="flex-grow-0 flex-shrink-0 w-[359px] h-[46px]"
          >
            <div className="flex justify-center items-center w-[359px] h-[46px] absolute left-0 top-28 gap-2.5 px-[63px] py-2.5 rounded-[5px] bg-white/90">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-theme">
                회원가입
              </p>
            </div>
          </Link>
        </div>
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[359px] h-[23px] text-base text-center flex justify-center gap-2">
          <span className=" h-[23px] text-base text-center text-white/50">
            이미 계정이 있나요?
          </span>
          <Link href="/login">
            <span className=" h-[23px] text-base font-bold text-center text-white">
              로그인
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
};

function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.375 10C19.3751 12.2075 18.5963 14.3442 17.1757 16.0338C15.7551 17.7234 13.7838 18.8575 11.6091 19.2364C9.43445 19.6153 7.19581 19.2146 5.28751 18.105C3.37921 16.9954 1.92366 15.248 1.17723 13.1706C0.4308 11.0932 0.441368 8.81897 1.20707 6.74857C1.97278 4.67818 3.4445 2.94438 5.36304 1.85255C7.28157 0.760724 9.52384 0.380905 11.6949 0.779992C13.866 1.17908 15.8266 2.33147 17.2314 4.0342C17.3012 4.11267 17.3544 4.2044 17.3879 4.3039C17.4214 4.4034 17.4345 4.50863 17.4264 4.61331C17.4183 4.71798 17.3892 4.81996 17.3409 4.91314C17.2925 5.00632 17.2258 5.08879 17.1449 5.15563C17.0639 5.22248 16.9703 5.27231 16.8697 5.30217C16.769 5.33203 16.6634 5.3413 16.5591 5.32941C16.4548 5.31753 16.3539 5.28475 16.2626 5.23302C16.1712 5.18129 16.0912 5.11168 16.0273 5.02834C14.8783 3.6351 13.282 2.68296 11.5102 2.33392C9.73826 1.98487 7.90016 2.26047 6.30856 3.11384C4.71695 3.9672 3.47014 5.34561 2.78023 7.01459C2.09033 8.68356 1.99994 10.54 2.52444 12.2681C3.04894 13.9962 4.15594 15.4892 5.65712 16.4932C7.15829 17.4971 8.96092 17.95 10.7583 17.7747C12.5558 17.5995 14.237 16.8069 15.5159 15.5319C16.7949 14.2569 17.5926 12.5781 17.7734 10.7813H10C9.7928 10.7813 9.59409 10.699 9.44757 10.5524C9.30106 10.4059 9.21875 10.2072 9.21875 10C9.21875 9.79282 9.30106 9.5941 9.44757 9.44759C9.59409 9.30108 9.7928 9.21877 10 9.21877H18.5938C18.801 9.21877 18.9997 9.30108 19.1462 9.44759C19.2927 9.5941 19.375 9.79282 19.375 10Z"
        fill="white"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9343 17.0615C19.8781 16.9276 19.7872 16.8127 19.6718 16.7295C18.0809 15.5908 17.75 13.6484 17.75 12.2188C17.75 10.4932 19.0128 8.99024 19.7656 8.24707C19.8396 8.17406 19.8986 8.08609 19.9389 7.98854C19.9792 7.89099 20 7.7859 20 7.67969C20 7.57348 19.9792 7.46839 19.9389 7.37084C19.8986 7.27328 19.8396 7.18532 19.7656 7.11231C18.5768 5.94336 16.6081 5.1875 14.75 5.1875C13.4152 5.18857 12.1105 5.6007 11 6.37207C9.70445 5.46715 8.14672 5.06075 6.59467 5.22276C5.04262 5.38477 3.59328 6.10507 2.4959 7.25977C1.83987 7.95741 1.32514 8.78528 0.982265 9.6942C0.639392 10.6031 0.475378 11.5745 0.499965 12.5508C0.537081 14.1985 0.888968 15.822 1.53508 17.3266C2.18119 18.8311 3.10858 20.1864 4.26309 21.3135C4.95853 21.9979 5.87979 22.3779 6.83653 22.375H15.0565C15.568 22.376 16.0743 22.2676 16.5439 22.0564C17.0135 21.8453 17.4364 21.5359 17.7865 21.1475C18.4351 20.4204 18.9961 19.6137 19.4572 18.7451C20.1153 17.4922 20.0309 17.2969 19.9343 17.0615ZM16.6878 20.083C16.4784 20.3146 16.2256 20.4988 15.9449 20.6243C15.6643 20.7498 15.3619 20.8139 15.0565 20.8125H6.83653C6.2635 20.8144 5.7117 20.5868 5.29528 20.1768C4.28472 19.1912 3.47283 18.0058 2.90703 16.6897C2.34123 15.3736 2.03287 13.9533 1.99997 12.5117C1.97946 11.7458 2.10708 10.9833 2.37524 10.2698C2.6434 9.5563 3.04662 8.90627 3.5609 8.3584C4.04139 7.84707 4.61542 7.44128 5.24906 7.16502C5.88269 6.88876 6.56307 6.74764 7.24997 6.75H7.32309C8.49146 6.76282 9.62161 7.18528 10.5312 7.94922C10.6642 8.06016 10.8296 8.12061 11 8.12061C11.1704 8.12061 11.3357 8.06016 11.4687 7.94922C12.3978 7.16891 13.5565 6.74545 14.75 6.75C15.9418 6.76441 17.1078 7.1136 18.125 7.76074C16.9062 9.17871 16.25 10.7363 16.25 12.2188C16.25 14.54 16.9662 16.3916 18.3293 17.6191C17.9001 18.5192 17.3471 19.3492 16.6878 20.083ZM11.0215 3.42969C11.2295 2.59054 11.6995 1.84727 12.3575 1.31689C13.0156 0.786507 13.8242 0.499132 14.6562 0.500002H14.75C14.9489 0.500002 15.1396 0.582312 15.2803 0.728825C15.4209 0.875338 15.5 1.07405 15.5 1.28125C15.5 1.48845 15.4209 1.68717 15.2803 1.83368C15.1396 1.98019 14.9489 2.0625 14.75 2.0625H14.6562C14.1574 2.06246 13.6726 2.2351 13.2783 2.55329C12.8839 2.87148 12.6022 3.31718 12.4775 3.82031C12.4277 4.02104 12.3035 4.19297 12.1321 4.29827C11.9607 4.40358 11.7561 4.43364 11.5634 4.38184C11.3707 4.33004 11.2057 4.20062 11.1046 4.02206C11.0035 3.8435 10.9746 3.63041 11.0243 3.42969H11.0215Z"
        fill="white"
      />
    </svg>
  );
}
