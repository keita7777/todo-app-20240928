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
