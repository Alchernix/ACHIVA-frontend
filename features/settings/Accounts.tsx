import {
  SettingPasswordIcon,
  SettingBirthdayIcon,
  SettingNextIcon,
} from "@/components/Icons";
import Link from "next/link";

export default function Accounts() {
  const icons = [SettingPasswordIcon, SettingBirthdayIcon];
  const labels = ["비밀번호 재설정", "생년월일"];
  const links = ["password", "birthday"];
  return (
    <div className="flex-1 flex flex-col text-theme">
      <ul className="flex flex-col gap-5">
        {labels.map((label, i) => {
          const Icon = icons[i];
          return (
            <Link key={label} href={`/settings/accounts/${links[i]}`}>
              <li className="flex items-center gap-5 sm:px-2.5 py-1.5 rounded-md hover:bg-[#E6E6E6]">
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
    </div>
  );
}
