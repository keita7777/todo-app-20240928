// データベースにはステータスの識別名のみ保存してあるので日本語名を表示するための処理
export const statusName = (status: string) => {
  switch (status) {
    case "notstarted":
      return "未着手";
    case "progress":
      return "進行中";
    case "done":
      return "完了";
    default:
      break;
  }
};

// 以下不要になった
// <span className={statusStyle(todo.id)}></span>みたいな感じで使おうと思っていたがうまく使えなかった
export const statusStyle = (status: string) => {
  switch (status) {
    case "notstarted":
      return "bg-blue-300";
    case "progress":
      return "bg-green-300";
    case "done":
      return "bg-gray-300";
    default:
      break;
  }
};
