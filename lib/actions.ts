"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/prisma/db";
import { loginSchema } from "@/validations/loginSchema";
import { signupSchema } from "@/validations/signupSchema";
import { todoSchema } from "@/validations/todoSchema";
import { Status } from "@prisma/client";
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
  try {
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
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: true,
        message: "このメールアドレスはすでに登録されています",
      };
    }

    return {
      error: true,
      message: "エラーが発生しました",
    };
  }
};

export const loginWithCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const loginValidation = loginSchema.safeParse({
      email,
      password,
    });

    if (!loginValidation.success) {
      return {
        error: true,
        message:
          loginValidation.error?.issues[0]?.message ?? "エラーが発生しました",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error: any) {
    return {
      error: true,
      message:
        error.cause.err.message || "メールアドレスかパスワードが間違っています",
    };
  }
};

export const createTodo = async ({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: Status;
}) => {
  const todoValidation = todoSchema.safeParse({
    title,
    description,
    status,
  });

  if (!todoValidation.success) {
    return {
      error: true,
      message:
        todoValidation.error?.issues[0]?.message ?? "エラーが発生しました",
    };
  }

  const session = await auth();
  const sessionUserEmail = session?.user?.email;
  const user = prisma.user.findUnique({
    where: {
      email: sessionUserEmail as string,
    },
  });

  try {
    // await prisma.todo.create({
    //   data: {
    //     title,
    //     description,
    //     status,
    //   },
    // });
  } catch (error) {}
};
