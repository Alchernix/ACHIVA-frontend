import Settings from "@/features/settings/Settings";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-75 border-r border-r-theme h-dvh px-6 py-10 flex flex-col">
        <h2 className="font-bold text-2xl mb-16">설정</h2>
        <Settings />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
