"use client";

import { createUser } from "@/lib/actions";
import { signupSchema } from "@/validations/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormInput = z.infer<typeof signupSchema>;

const Signup = () => {
  const {
    handleSubmit,
    reset,
    register,
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

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">新規ユーザー登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-red-500">{errors["passwordConfirm"].message}</p>
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
      </form>
    </div>
  );
};
export default Signup;
