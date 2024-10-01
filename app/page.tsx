import { auth } from "@/auth";
// import { redirect } from "next/navigation";

export default function Home() {
  const session = auth();
  if (!session) {
    // redirect("/signin");
    return <p>sessionがありません</p>;
  }
  // redirect("/todos");
  return <p>sessionがあります</p>;
}

// ホーム画面作ってなかったのでリダイレクトさせるようにした
