import { NextAuthOptions, getServerSession } from "next-auth";
import prisma from "./prisma";
import { verify } from "argon2";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "./prisma-adapter";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
    jwt: ({ token, user }) => {
      if (!user) {
        token.user = {
          id: token.sub as string,
          email: token.email,
          name: token.name,
          image: token.picture,
        };
      }

      return token;
    },
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
      async authorize(credentials) {
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
      id: "github",
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

export const getAuth = () => getServerSession(authOptions);
