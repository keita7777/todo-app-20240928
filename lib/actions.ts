"use server";

import { TodoFormInput } from "@/app/(todo)/todos/create/page";
import { auth, signIn, signOut } from "@/auth";
import prisma from "@/prisma/db";
import { loginSchema } from "@/validations/loginSchema";
import { signupSchema } from "@/validations/signupSchema";
import { todoSchema } from "@/validations/todoSchema";
import { Status } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// 新規ユーザー登録処理
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

    // バリデーションチェックに失敗した場合はエラーを返す
    if (!signupValidation.success) {
      return {
        error: true,
        message:
          signupValidation.error?.issues[0].message ?? "エラーが発生しました",
      };
    }

    // パスワードをハッシュ化する
    const hashedPassword = await hash(password, 10);

    // データベースにデータを挿入する
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
  } catch (error: unknown) {
    // データベース上にメールアドレスが既に存在した場合はエラーを返す
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: true,
          message: "このメールアドレスはすでに登録されています",
        };
      }
    }

    // その他のエラーを返す
    return {
      error: true,
      message: "エラーが発生しました",
    };
  }
};

// 認証処理
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

    // バリデーションチェックに失敗した場合はエラーを返す
    if (!loginValidation.success) {
      return {
        error: true,
        message:
          loginValidation.error?.issues[0]?.message ?? "エラーが発生しました",
      };
    }

    // 認証処理
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // ユーザーのログイン日時をデータベースに保存
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  } catch (error: unknown) {
    // 認証に関するエラーを返す
    if (error instanceof AuthError) {
      return {
        error: true,
        message:
          error.cause?.err?.message ||
          "メールアドレスかパスワードが間違っています",
      };
    }

    // その他のエラーを返す
    return {
      error: true,
      message: "ログインに失敗しました",
    };
  }
};

// ログアウト処理
export const logout = async () => {
  await signOut();
};

// 新規TODO作成処理
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

  // バリデーションチェックに失敗した場合はエラーを返す
  if (!todoValidation.success) {
    return {
      error: true,
      message:
        todoValidation.error?.issues[0]?.message ?? "エラーが発生しました",
    };
  }

  // 現在ログインしているユーザーの情報を取得する
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

  // ユーザーが見つからない場合はログインページにリダイレクト
  if (!userId) {
    redirect("/login");
  }

  try {
    // 新規TODOをデータベースに保存
    await prisma.todo.create({
      data: {
        title,
        description,
        status,
        userId: userId.id,
      },
    });
  } catch {
    // 失敗した場合エラーを返す
    return {
      error: true,
      message: "エラーが発生しました",
    };
  }
};

// TODO取得処理、フィルター、ソート、ページネーション、検索でも使用
export const getAllTodos = async (
  pageSize: number,
  page: number,
  query: string,
  status: Status,
  sort: "desc" | "asc"
) => {
  const todos = await prisma.todo.findMany({
    where: {
      // 検索用にtitleにqueryの文字があるかチェック
      title: {
        contains: query,
      },
      // ステータスでのフィルター用
      status,
    },
    // ユーザー名も取得したいのでuser情報も取得する
    include: {
      user: true,
    },
    // 日付でのソート用、デフォルトは降順
    orderBy: {
      updatedAt: sort || "desc",
    },
    // 1ページに何件表示するか設定（5件としている）
    take: pageSize,
    // ページネーション用
    skip: (page - 1) * pageSize,
  });
  return todos;
};

// 特定のidを持つTODOを取得する処理
// /todos/[id]　および　/todos/[id]/edit　で使用する
export const getTodoDetail = async (id: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
    // ユーザー情報も取得する
    include: {
      user: true,
    },
  });

  // 該当するTODOが見つからなかった場合エラーを返す
  if (!todo) {
    throw new Error("TODOの取得に失敗しました");
  }

  return todo;
};

// TODO更新処理
export const updateTodo = async (todoId: string, data: TodoFormInput) => {
  try {
    // idに一致したTODOをフォームのデータで更新する
    await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        ...data,
      },
    });
  } catch {
    // 失敗した場合エラーを返す
    return {
      error: true,
      message: "更新に失敗しました",
    };
  }
};

// TODO削除処理
export const deleteTodo = async (id: string) => {
  try {
    // idに一致したTODOを削除する
    await prisma.todo.delete({
      where: {
        id,
      },
    });
  } catch {
    // 失敗した場合エラーを返す
    return {
      error: true,
      message: "更新に失敗しました",
    };
  }
};

// 特定のメールアドレスを持つユーザーを取得する処理
// /profileで使用する
export const getUserByEmail = async (email: string) => {
  try {
    // 特定のメールアドレスを持つユーザーをデータベースから探す
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // ユーザーが見つからなかった場合エラーを返す
    if (!user) {
      return null;
    }

    return user;
  } catch {
    // 予期せぬエラーが発生した場合の処理
    // throw new Errorのほうがよいのか？
    console.log("エラーが発生しました");
  }
};

// 検索で指定した文字や、特定のステータスのTODO件数を取得する
// 検索機能、フィルター機能、ページネーションで使用
export const countTodo = async (query: string, status: Status) => {
  const todoCount = await prisma.todo.count({
    where: {
      title: {
        contains: query,
      },
      status,
    },
  });

  return todoCount;
};

// データベースにあるすべてのTODO件数を取得する処理
// TODOが1件もない場合はメッセージを表示するので、そのため用の処理
export const countAllTodo = async () => {
  const todoAllCount = await prisma.todo.count();

  return todoAllCount;
};
