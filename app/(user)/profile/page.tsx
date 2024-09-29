import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const userEmail = session.user.email as string;
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
