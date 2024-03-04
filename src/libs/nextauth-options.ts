import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import prisma from "./prisma";
import { verify } from "argon2";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "./prisma-adapter";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials) return null;

        const foundUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!foundUser) throw new Error("User not found");

        const comparePassword = verify(
          foundUser.password as string,
          credentials.password
        );

        if (!comparePassword) throw new Error("Password is incorrect");

        const user = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };

        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
