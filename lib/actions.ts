"use server";

import prisma from "@/prisma/db";
import { signupSchema } from "@/validations/signupSchema";
import { hash } from "bcryptjs";

export const createUser = async ({
  email,
  username,
  password,
  passwordConfirm,
}: {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}) => {
  // クライアント側でもバリデーションしているがサーバー側でもチェック
  // クライアント側でチェックしているので以下の状態だとエラーは発生しないが
  // email: "" とかにするとクライアント側でconsole.log(response);で
  // エラーが発生する
  const signupValidation = signupSchema.safeParse({
    email,
    username,
    password,
    passwordConfirm,
  });

  if (!signupValidation.success) {
    return {
      error: true,
      message:
        signupValidation.error?.issues[0].message ?? "エラーが発生しました",
    };
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });
};
