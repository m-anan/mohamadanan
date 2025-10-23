"use client";
import "./globals.css";

import { SessionProvider, useSession } from "next-auth/react";
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
