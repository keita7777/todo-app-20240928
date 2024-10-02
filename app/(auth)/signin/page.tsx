"use client";

import { loginWithCredentials } from "@/lib/actions";
import { loginSchema } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type LoginFormInput = z.infer<typeof loginSchema>;

const Signin = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInput) => {
    const response = await loginWithCredentials({ ...data });

    // 認証処理結果に何かしらのメッセージがある場合はエラーとみなす
    if (response?.message) {
      setError("email", {
        message: response.message,
      });
    } else {
      // メッセージがない場合は認証成功とみなして/todosに遷移させる
      router.push("/todos");
      router.refresh();
    }
  };

  return (
    <div>
      {formState.isSubmitSuccessful ? null : (
        <>
          <h1 className="text-center text-2xl font-bold mb-6">ログイン</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={formState.isSubmitting}>
              <div className="flex flex-col mb-4">
                <label htmlFor="username">ユーザー名</label>
                <input
                  id="username"
                  type="text"
                  className="border rounded-md p-2 text-sm"
                  {...register("email")}
                />
                {errors["email"] && (
                  <p className="text-red-500">{errors["email"].message}</p>
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
                >
                  ログイン
                </button>
              </div>
            </fieldset>
          </form>
        </>
      )}
    </div>
  );
};
export default Signin;
