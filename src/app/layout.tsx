import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/modules/common/components/Navbar/Navbar";
import Footer from "@/modules/common/components/Footer/Footer";
import AosInit from "@/core/hook/AosInit";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import Providers from "./providers";
import { CartProvider } from "@/modules/common/contexts/Store";

const PingARLT = localFont({
  src: [
    { path: "../config/PingARLT-Regular.woff2", weight: "400" },
    { path: "../config/PingARLT-Medium.woff2", weight: "500" },
  ],
  variable: "--font-pingARLT",
});

export const metadata: Metadata = {
  title: "متجر تجريبي",
};

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
      <body className={`${PingARLT.className} bg-[#f9fafb]`}>
        <AosInit />
        <Providers>
          {" "}
          <CartProvider>
            {children}
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
