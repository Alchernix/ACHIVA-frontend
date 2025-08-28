import Link from "next/link";
import { SettingNextIcon } from "@/components/Icons";

export default function Notice() {
  return (
    <div className="h-full w-full">
      <ul>
        <Link href="https://achivamain.notion.site/25df9799dbb8807291dee19394e1347b">
          <li className={`flex items-center gap-5 sm:px-2.5 h-11 rounded-md`}>
            <p className="text-theme font-semibold text-lg">
              이벤트 - 나만의 성취 미니북
            </p>
            <div className="ml-auto">
              <SettingNextIcon />
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
}
