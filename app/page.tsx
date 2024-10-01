import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const session = auth();
  if (!session) {
    redirect("/signin");
  }
  redirect("/todo");
}
