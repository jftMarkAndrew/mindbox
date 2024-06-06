import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoContainer } from "./TodoContainer";

test("renders TodoContainer component", () => {
  render(<TodoContainer />);
  expect(screen.getByText("Todos")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(button);

  expect(screen.getByText("Test Todo")).toBeInTheDocument();
});

test("clears input field after adding a todo", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(button);

  expect(input).toHaveValue("");
});

test("does not add an empty todo", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(button);
  expect(screen.getByText("Test Todo")).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(button);

  const todos = screen.getAllByText("Test Todo");
  expect(todos.length).toBe(1);
});

test("toggles a todo", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(button);

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("filters active todos", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Active Todo" } });
  fireEvent.click(button);

  fireEvent.change(input, { target: { value: "Completed Todo" } });
  fireEvent.click(button);
  const checkbox = screen.getAllByRole("checkbox")[1];
  fireEvent.click(checkbox);

  const showActiveButton = screen.getByText("Active");
  fireEvent.click(showActiveButton);

  expect(screen.getByText("Active Todo")).toBeInTheDocument();
  expect(screen.queryByText("Completed Todo")).not.toBeInTheDocument();
});

test("updates active todo count", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Active Todo" } });
  fireEvent.click(button);

  fireEvent.change(input, { target: { value: "Completed Todo" } });
  fireEvent.click(button);
  const checkbox = screen.getAllByRole("checkbox")[1];
  fireEvent.click(checkbox);

  expect(
    screen.getByText((_, element) => {
      return element?.textContent === "1 items left";
    })
  ).toBeInTheDocument();
});

test("clear completed button removes completed todos", () => {
  render(<TodoContainer />);
  const input = screen.getByPlaceholderText("What needs to be done?");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "Completed Todo" } });
  fireEvent.click(button);
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  fireEvent.change(input, { target: { value: "Active Todo" } });
  fireEvent.click(button);

  const deleteCompletedButton = screen.getByText("Clear Completed");
  fireEvent.click(deleteCompletedButton);

  expect(screen.queryByText("Completed Todo")).not.toBeInTheDocument();
  expect(screen.getByText("Active Todo")).toBeInTheDocument();
});
