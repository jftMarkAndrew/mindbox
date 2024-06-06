import { Filter } from "../types/filter";

interface TodoFooterProps {
  todos: { text: string; done: boolean }[];
  filter: Filter.All | Filter.Active | Filter.Completed;
  setFilter: (filter: Filter.All | Filter.Active | Filter.Completed) => void;
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
      <span>
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
      <button
        onClick={() => setFilter(Filter.All)}
        disabled={filter === Filter.All}
      >
        Show All
      </button>
      <button
        onClick={() => setFilter(Filter.Active)}
        disabled={filter === Filter.Active}
      >
        Active
      </button>
      <button
        onClick={() => setFilter(Filter.Completed)}
        disabled={filter === Filter.Completed}
      >
        Completed
      </button>
      <button onClick={deleteCompleted}>Clear Completed</button>
    </div>
  );
};
