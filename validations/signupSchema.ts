import { z } from "zod";
import { passwordMatchSchema } from "./passwordMatchSchema";

export const signupSchema = z
  .object({
    email: z.string().min(1, "メールアドレスを入力してください").email(),
    username: z.string().min(1, "ユーザー名を入力してください"),
  })
  .and(passwordMatchSchema);
