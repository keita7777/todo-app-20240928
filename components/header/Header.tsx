import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import HeaderLinks from "./HeaderLinks";
import { auth } from "@/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className="border-b p-2">
      <div className="flex justify-between max-w-2xl mx-auto gap-4">
        <div className="flex items-center justify-between gap-4 flex-1">
          <div className="text-xl font-bold text-blue-600">TODO APP</div>
          <nav>
            <ul className="flex gap-2 text-sm">
              <HeaderLinks isSession={!!session} />
            </ul>
          </nav>
        </div>
        {session && (
          <div className="flex items-center gap-4">
            <div>
              <input
                type="text"
                placeholder="TODOを検索"
                className="border rounded-md px-2 py-1 text-sm"
              />
            </div>
            <div>
              {session && <p>{session.user?.email}</p>}
              <FaUserCircle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
