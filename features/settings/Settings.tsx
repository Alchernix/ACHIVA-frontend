import {
  SettingAccountIcon,
  SettingNotificationIcon,
  SettingPrivateIcon,
  SettingInfoIcon,
  SettingNoticeIcon,
  SettingInquiryIcon,
  SettingNextIcon,
} from "@/components/Icons";
import LogoutBtn from "@/components/LogoutBtn";
import Link from "next/link";

export default function Settings() {
  const icons = [
    SettingAccountIcon,
    SettingNotificationIcon,
    SettingPrivateIcon,
    SettingInfoIcon,
    SettingNoticeIcon,
    SettingInquiryIcon,
  ];
  const labels = ["계정 관리", "알림", "개인정보 보호", "정보", "공지", "문의"];
  const links = ["accounts/password", "", "", "", "", ""];
  return (
    <div className="flex-1 flex flex-col text-theme">
      <ul className="flex flex-col gap-5">
        {labels.map((label, i) => {
          const Icon = icons[i];
          return (
            <Link key={label} href={`/settings/${links[i]}`}>
              <li
                className={`flex items-center gap-5 sm:px-2.5 py-1.5 rounded-md hover:bg-[#E6E6E6]`}
              >
                <Icon />
                <p className="font-semibold text-lg">{label}</p>
                <div className="ml-auto">
                  <SettingNextIcon />
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="mt-auto flex flex-col gap-4 items-start sm:px-2.5">
        <div className="w-full flex justify-between">
          <span className="font-semibold text-lg">버전</span>
          <span>5.11.0</span>
        </div>
        <LogoutBtn />
      </div>
    </div>
  );
}
