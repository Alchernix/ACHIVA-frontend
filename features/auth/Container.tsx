type Props = {
  classes: string;
  children: React.ReactNode;
};
export default function Container({ classes, children }: Props) {
  return (
    <div
      className={`w-90 ${classes} rounded-[15px] sm:border sm:border-theme sm:px-10 py-7 flex flex-col items-center mt-20 sm:mt-0 sm:justify-evenly`}
    >
      {children}
    </div>
  );
}
