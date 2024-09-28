const Edit = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">TODOを編集</h1>
      <form action="">
        <div className="flex flex-col">
          <label htmlFor="">タイトル</label>
          <input type="text" className="border rounded-md p-2 text-sm mb-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">詳細</label>
          <textarea className="border rounded-md p-2 text-sm mb-2" />
        </div>
        <div className="flex flex-col max-w-1/2">
          <label htmlFor="">ステータス</label>
          <select
            name=""
            id=""
            defaultValue="default"
            className="border rounded-md p-2 text-sm mb-2"
          >
            <option value="default" disabled>
              ステータスを選択
            </option>
            <option value="notstarted">未着手</option>
            <option value="progress">進行中</option>
            <option value="done">完了</option>
          </select>
        </div>
        <div className="flex justify-center gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
          >
            更新
          </button>
          <button
            type="submit"
            className="bg-gray-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
          >
            リセット
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit;
