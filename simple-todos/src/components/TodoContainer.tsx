import { useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { Filter } from "../types/filter";

export const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);
  const [filter, setFilter] = useState<
    Filter.All | Filter.Active | Filter.Completed
  >(Filter.All);

  const addTodo = (text: string) => {
    setTodos([...todos, { text, done: false }]);
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filter.Active) return !todo.done;
    if (filter === Filter.Completed) return todo.done;
    return true;
  });

  return (
    <div className="container">
      <h1>Todos</h1>
      <TodoInput addTodo={addTodo} />
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          toggleTodo={toggleTodo}
        />
      ))}
      <TodoFooter
        todos={todos}
        filter={filter}
        setFilter={setFilter}
        deleteCompleted={deleteCompleted}
      />
    </div>
  );
};
