"use client";
// border + padding + 가운데 정렬 까지만!!

type Props = {
  classes: string;
  children: React.ReactNode;
};
export default function Container({ classes, children }: Props) {
  return (
    <div
      className={`w-screen sm:w-90 ${classes} rounded-[15px] sm:border sm:border-theme px-10 py-7 flex items-center justify-center`}
    >
      {children}
    </div>
  );
}
