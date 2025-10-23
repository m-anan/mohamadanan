import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };
