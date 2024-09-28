import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          throw new Error("このメールアドレスは登録されていません");
        } else {
          const passwordCorrect = await compare(
            credentials.password as string,
            user.password!
          );
          if (!passwordCorrect) {
            throw new Error("パスワードが間違っています");
          }
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
});
