import {
  ThumbUpCheerIcon,
  FireCheerIcon,
  HeartCheerIcon,
  CloverCheerIcon,
} from "@/components/Icons";

export default function CheerBtns() {
  const labels = ["최고예요", "수고했어요", "응원해요", "동기부여"];
  const icons = [
    ThumbUpCheerIcon,
    FireCheerIcon,
    HeartCheerIcon,
    CloverCheerIcon,
  ];
  return (
    <div className="flex gap-1.5 items-center justify-center py-3.5">
      {labels.map((label, idx) => {
        const active = false;
        const Icon = icons[idx];
        return (
          <button
            key={label}
            className={`text-xs sm:text-base flex items-center gap-[2px] sm:gap-1 rounded-full border border-theme px-3 py-1 ${
              active ? "" : ""
            }`}
          >
            <p>{label}</p>
            {<Icon />}
          </button>
        );
      })}
    </div>
  );
}
