import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(5, "パスワードは5文字以上設定してください");
