interface TodoItemProps {
  todo: { text: string; done: boolean };
  index: number;
  toggleTodo: (index: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, index, toggleTodo }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(index)}
      />
      <span>{todo.text}</span>
    </div>
  );
};
