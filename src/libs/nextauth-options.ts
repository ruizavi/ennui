import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { verify } from "argon2";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
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

        if (!foundUser) return null;

        if (!foundUser.password) return null;

        const comparePassword = verify(
          foundUser.password,
          credentials.password
        );

        if (!comparePassword) return null;

        return {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };
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
};

export const getServerAuthSession = () => getServerSession(authOptions);
