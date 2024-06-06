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
    <div className="footer">
      <span className="footer-counter">
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>
      <div className="footer-filters">
        <button
          className={filter === Filter.All ? "active" : ""}
          onClick={() => setFilter(Filter.All)}
          disabled={filter === Filter.All}
        >
          Show All
        </button>
        <button
          className={filter === Filter.Active ? "active" : ""}
          onClick={() => setFilter(Filter.Active)}
          disabled={filter === Filter.Active}
        >
          Active
        </button>
        <button
          className={filter === Filter.Completed ? "active" : ""}
          onClick={() => setFilter(Filter.Completed)}
          disabled={filter === Filter.Completed}
        >
          Completed
        </button>
      </div>
      <button className="footer-clear" onClick={deleteCompleted}>
        Clear Completed
      </button>
    </div>
  );
};
