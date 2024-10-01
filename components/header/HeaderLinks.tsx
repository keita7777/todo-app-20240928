import Link from "next/link";

const links = [
  { label: "TODO一覧", href: "/todos", requireAuth: true },
  { label: "TODO作成", href: "/todos/create", requireAuth: true },
  { label: "新規登録", href: "/signup", requireAuth: false },
  { label: "ログイン", href: "/signin", requireAuth: false },
];

interface HeaderLinksProps {
  isSession: boolean;
}

const HeaderLinks = ({ isSession }: HeaderLinksProps) => {
  return (
    <>
      {links
        // sessionの有無によって表示するリンクを切り替える
        .filter((link) => link.requireAuth === isSession)
        .map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="px-2 py-1 hover:border-b-2 border-blue-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
    </>
  );
};
export default HeaderLinks;
