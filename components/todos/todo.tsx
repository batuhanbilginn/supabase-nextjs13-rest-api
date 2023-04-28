"use client";
import { Todo } from "@/types/collections";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import TodoStatus from "./todo-status";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const deleteTodoHandler = async () => {
    try {
      const response = await fetch(`/api/todo/${todo.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 border rounded-md border-neutral-100">
      <div>{todo.task}</div>
      {/* Buttons */}
      <div className="flex items-center gap-3">
        <TodoStatus todo={todo} />
        <Button onClick={deleteTodoHandler} size="sm" variant="ghost">
          <Trash2 size="12" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
