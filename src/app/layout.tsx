import type { Metadata } from "next";
import "./globals.css";
import AosInit from "@/core/hook/AosInit";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import Providers from "./providers";
import Navbar from "@/modules/common/components/Navbar";
import Footer from "@/modules/common/components/Footer";
import { MuseoModerno } from "next/font/google";

const PingARLT = localFont({
  src: [
    { path: "../config/PingARLT-Regular.woff2", weight: "400" },
    { path: "../config/PingARLT-Medium.woff2", weight: "500" },
  ],
  variable: "--font-pingARLT",
});

export const metadata: Metadata = {
  title: "Mohamad Anan",
};

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-museoModerno",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
  } catch (error) {
    return notFound();
  }
  return (
    <html lang="en">
      <body className={`${museoModerno.className} bg-[#f9fafb]`}>
        <AosInit />
        <Providers>
          {/* <Navbar /> */}
          <div className="min-h-screen"> {children}</div>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
