import { useState } from "react";

interface TodoItemProps {
  todo: { text: string; done: boolean };
  index: number;
  toggleTodo: (index: number) => void;
  editTodo: (index: number, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  toggleTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(index)}
        className="todo-checkbox"
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          className="todo-edit-input"
          autoFocus
        />
      ) : (
        <span
          className={`todo-text ${todo.done ? "completed" : ""}`}
          onDoubleClick={handleEdit}
        >
          {todo.text}
        </span>
      )}
    </div>
  );
};
