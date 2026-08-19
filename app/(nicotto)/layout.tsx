import type { Metadata } from "next";
import "@/styles/nicotto.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NicottoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=M+PLUS+Rounded+1c:wght@500;700;800&family=Quicksand:wght@600;700&display=swap"
          rel="stylesheet"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
