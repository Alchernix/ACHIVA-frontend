import Image from "next/image";

export function TextLogo({ width = 134 }: { width?: number }) {
  return (
    <div
      style={{
        width, // 원하는 너비
        aspectRatio: "147.85 / 43.35", // viewBox 비율 그대로
      }}
    >
      <img className="w-full" src="/textLogo.svg" alt="로고" />
    </div>
  );
}

export function TextLogoWhite({ width = 134 }: { width?: number }) {
  return (
    <div
      style={{
        width, // 원하는 너비
        aspectRatio: "147.85 / 43.35", // viewBox 비율 그대로
      }}
    >
      <img style={{ width: width }} src="/textLogoWhite.svg" alt="로고" />
    </div>
  );
}

export function Logo({ width = 32 }: { width?: number }) {
  return (
    <div
      style={{
        width, // 원하는 너비
        aspectRatio: 1, // viewBox 비율 그대로
      }}
      className="rounded-md overflow-hidden"
    >
      <Image src="/logo.png" alt="로고" width={width} height={width} />
    </div>
  );
}
