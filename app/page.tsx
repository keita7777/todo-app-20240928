import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const session = auth();
  if (!session) {
    redirect("/signin");
  }
  redirect("/todos");
}

// ホーム画面作ってなかったのでリダイレクトさせるようにした
