import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty Grow 採用LP",
  robots: { index: false, follow: false },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%9C%82%3C/text%3E%3C/svg%3E",
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        style={{
          fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif",
          background: "#fbfaf7",
          color: "#26231f",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
