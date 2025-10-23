import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string; // User ID
    accessToken: string; // The access token from API
    name: string; // User's name
    email: string; // User's email
  }

  interface Session extends DefaultSession {
    accessToken: string; // Attach the token to the session
    user: {
      id: string; // User ID
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // User ID
    accessToken: string; // Token for authentication
    email: string; // User's email
    name: string; // User's name
  }
}
