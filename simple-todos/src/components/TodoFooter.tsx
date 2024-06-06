interface TodoFooterProps {
  todos: { text: string; done: boolean }[];
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  deleteCompleted: () => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  todos,
  filter,
  setFilter,
  deleteCompleted,
}) => {
  const activeCount = todos.filter((todo) => !todo.done).length;

  return (
    <div>
      <span>{activeCount} items left</span>
      <button onClick={() => setFilter("all")} disabled={filter === "all"}>
        Show All
      </button>
      <button
        onClick={() => setFilter("active")}
        disabled={filter === "active"}
      >
        Show Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        disabled={filter === "completed"}
      >
        Show Completed
      </button>
      <button onClick={deleteCompleted}>Delete Completed</button>
    </div>
  );
};
