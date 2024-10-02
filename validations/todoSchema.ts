// TODO作成/編集フォームのバリデーション

import { Status } from "@prisma/client";
import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "タイトルを入力してください"),
  description: z.string().min(1, "詳細を入力してください"),
  status: z.enum(Object.keys(Status) as [Status, ...Status[]], {
    errorMap: () => ({ message: "ステータスを選択してください" }),
  }),
});
