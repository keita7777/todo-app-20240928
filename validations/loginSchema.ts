import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email({ message: "正しいメールアドレスを入力してください。" }),
  password: passwordSchema,
});
