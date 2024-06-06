import React from "react";

interface TodoItemProps {
  todo: { text: string; done: boolean };
  index: number;
  toggleTodo: (index: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  toggleTodo,
}) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(index)}
        className="todo-checkbox"
      />
      <span className={`todo-text ${todo.done ? "completed" : ""}`}>
        {todo.text}
      </span>
    </div>
  );
};
