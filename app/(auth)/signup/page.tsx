const Signup = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">新規ユーザー登録</h1>
      <form action="">
        <div className="flex flex-col">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="text"
            className="border rounded-md p-2 text-sm mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">ユーザー名</label>
          <input
            id="username"
            name="username"
            type="text"
            className="border rounded-md p-2 text-sm mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            className="border rounded-md p-2 text-sm mb-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passwordConfirm">パスワード確認</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            className="border rounded-md p-2 text-sm mb-2"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
