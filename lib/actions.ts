"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/prisma/db";
import { loginSchema } from "@/validations/loginSchema";
import { signupSchema } from "@/validations/signupSchema";
import { todoSchema } from "@/validations/todoSchema";
import { Status } from "@prisma/client";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

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
  const userId = await prisma.user.findUnique({
    where: {
      email: sessionUserEmail as string,
    },
    select: {
      id: true,
    },
  });

  if (!userId) {
    redirect("/login");
  }

  try {
    await prisma.todo.create({
      data: {
        title,
        description,
        status,
        userId: userId.id,
      },
    });
  } catch (error: any) {
    return {
      error: true,
      message: "エラーが発生しました",
    };
  }
};

export const getAllTodos = async () => {
  const todos = await prisma.todo.findMany({
    include: {
      user: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return todos;
};

export const getTodoDetail = async (id: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
    },
  });

  if (!todo) {
    throw new Error("TODOの取得に失敗しました");
  }

  return todo;
};
