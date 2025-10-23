import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials;

        try {
          const response = await fetch(`http://localhost:8000/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            console.error("Failed to authenticate:", response.statusText);
            throw new Error("Invalid credentials");
          }

          const responseData = await response.json();
          console.log("Login response:", responseData);

          // Ensure the data has a token and that the response structure is correct
          if (!responseData.token) {
            console.error("Token missing in response:", responseData);
            return null;
          }

          // Extract user data from the nested data object
          const userData = responseData.data;

          return {
            id: userData.id.toString(), // Store user ID
            accessToken: responseData.token, // Store the access token
            email: userData.email,
            name: userData.name,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        //@ts-ignore
        id: token.id,
        email: token.email,
        name: token.name,
      };
      session.accessToken = token.accessToken;

      return session;
    },
  },
};
