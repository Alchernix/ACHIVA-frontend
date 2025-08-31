import type { Metadata } from "next";
import { pretendard } from "@/lib/fonts";
import "./globals.css";
import Wrapper from "@/QueryClientProvider";

export const metadata: Metadata = {
  title: "ACHIVA",
  description: "성취 중심 SNS 플랫폼",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ACHIVA",
    description: "성취 중심 SNS 플랫폼",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      </head>
      <body className={`${pretendard.className} antialiased min-h-dvh`}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
