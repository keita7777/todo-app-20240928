// ルートにもloading.tsxを作成しているが、todos以下にもloading.tsxがないとTODO作成後にローディング画面が表示されなかった

const loading = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-orange-100 bg-opacity-60 flex justify-center items-center">
      <p className="text-2xl">ローディング中...</p>
    </div>
  );
};
export default loading;
