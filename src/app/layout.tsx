import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Togurt – Short film jobs & shoots",
  description: "Find directing, acting, writing, and crew opportunities in indie and short film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased pb-20 md:pb-0">
        <Header />
        <main>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
