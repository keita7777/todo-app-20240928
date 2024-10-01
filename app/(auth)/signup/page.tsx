"use client";

import { createUser } from "@/lib/actions";
import { signupSchema } from "@/validations/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormInput = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: FormInput) => {
    const response = await createUser({ ...data });

    // ユーザー作成処理結果に何かしらのメッセージがある場合はエラーとみなす
    if (response?.message) {
      setError("email", {
        message: response.message,
      });
    }
  };

  return (
    <>
      {/* // 送信が完了したらフォームを非表示にしてメッセージを表示させる */}
      {formState.isSubmitSuccessful ? (
        <div className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold mb-6">
            ユーザー登録が完了しました
          </h1>
          <p>
            こちらから
            <Link href="/signin" className="text-blue-600 underline">
              ログイン
            </Link>
            してください
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl font-bold mb-6">
            新規ユーザー登録
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 送信中はフォームを非活性にする */}
            <fieldset disabled={formState.isSubmitting}>
              <div className="flex flex-col mb-4">
                <label htmlFor="email">メールアドレス</label>
                <input
                  id="email"
                  type="text"
                  className="border rounded-md p-2 text-sm"
                  {...register("email")}
                />
                {errors["email"] && (
                  <p className="text-red-500">{errors["email"].message}</p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="username">ユーザー名</label>
                <input
                  id="username"
                  type="text"
                  className="border rounded-md p-2 text-sm"
                  {...register("username")}
                />
                {errors["username"] && (
                  <p className="text-red-500">{errors["username"].message}</p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password">パスワード</label>
                <input
                  id="password"
                  type="password"
                  className="border rounded-md p-2 text-sm"
                  {...register("password")}
                />
                {errors["password"] && (
                  <p className="text-red-500">{errors["password"].message}</p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="passwordConfirm">パスワード確認</label>
                <input
                  id="passwordConfirm"
                  type="password"
                  className="border rounded-md p-2 text-sm"
                  {...register("passwordConfirm")}
                />
                {errors["passwordConfirm"] && (
                  <p className="text-red-500">
                    {errors["passwordConfirm"].message}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
                >
                  登録
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};
export default Signup;
