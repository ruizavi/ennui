import { Prisma, PrismaClient } from "@prisma/client";
import { Adapter, AdapterAccount } from "next-auth/adapters";

export function PrismaAdapter(
  prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): Adapter {
  const p = prisma as PrismaClient;

  return {
    createUser: async (data) => await p.user.create({ data }),
    getUser: async (id) => await p.user.findUnique({ where: { id } }),
    getUserByAccount: async (provider) => {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId: provider },
        select: { user: true },
      });

      return account?.user ?? null;
    },
    updateUser: async ({ id, ...data }) =>
      await p.user.update({ where: { id }, data }),
    deleteUser: async (id) => await p.user.delete({ where: { id } }),
    linkAccount: async (data) =>
      (await p.account.create({ data })) as unknown as AdapterAccount,
    unlinkAccount: async (provider) =>
      (await p.account.delete({
        where: { provider_providerAccountId: provider },
      })) as unknown as AdapterAccount,
    getSessionAndUser: async (token) => {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken: token },
        include: { user: true },
      });

      if (!userAndSession) return null;

      const { user, ...session } = userAndSession;

      return { user, session };
    },
    createSession: async (data) => {
      return await p.session.create({ data });
    },
    updateSession: async (data) =>
      await p.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      }),
    deleteSession: async (sessionToken) =>
      await p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create({ data });

      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        });

        return verificationToken;
      } catch (error) {
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },
  };
}
