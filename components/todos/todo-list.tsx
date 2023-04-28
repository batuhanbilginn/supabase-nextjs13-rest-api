"use client";
import { Todo } from "@/types/collections";
import { useCallback, useEffect, useState } from "react";
import TodoItem from "./todo";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("/api/todo");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="mt-5 space-y-3">
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <div>No todos.</div>
      )}
    </div>
  );
};

export default TodoList;
