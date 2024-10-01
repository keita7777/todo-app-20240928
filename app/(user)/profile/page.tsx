import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  // sessionが取得できない場合、ユーザーが見つからない場合は/signinにリダイレクトさせる
  if (!session || !session.user) {
    redirect("/signin");
  }

  // sessionからメールアドレスを取得する
  const userEmail = session.user.email as string;
  // メールアドレスでユーザーを取得する
  const user = await getUserByEmail(userEmail);

  return (
    <div>
      <p>ユーザー名：{user?.username}</p>
      <p>
        最終ログイン日：
        {user?.lastLogin && new Date(user?.lastLogin).toLocaleString()}
      </p>
    </div>
  );
};
export default Profile;
