import { env } from "@/env.mjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

export const { auth: baseAuth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/images/logo-text.png",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (!session.user) return session;
      session.user.id = user.id;
      session.user.image = user.image;
      return session;
    },
  },
});
