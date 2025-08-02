type Props = {
  classes: string;
  children: React.ReactNode;
};
export default function Container({ classes, children }: Props) {
  return (
    <div
      className={`w-full sm:w-90 ${classes} rounded-[15px] sm:border sm:border-theme px-10 py-7 flex flex-col items-center justify-evenly`}
    >
      {children}
    </div>
  );
}
