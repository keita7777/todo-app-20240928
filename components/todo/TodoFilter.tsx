import TodoFilterButton from "./TodoFilterButton";

const TodoFilterButtons = [
  { label: "全て" },
  { label: "未着手", value: "notstarted" },
  { label: "進行中", value: "progress" },
  { label: "完了", value: "done" },
];

const TodoFilter = () => {
  return (
    <div className="flex justify-between mb-4 py-2">
      <div>
        <ul className="flex gap-2">
          {TodoFilterButtons.map((btn) => (
            <TodoFilterButton
              key={btn.value}
              label={btn.label}
              value={btn.value}
            />
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <button>昇順（日付）</button>
            <button>降順（日付）</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default TodoFilter;
