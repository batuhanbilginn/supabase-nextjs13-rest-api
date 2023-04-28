import { Todo } from "@/types/collections";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TodoStatus = ({ todo }: { todo: Todo }) => {
  const [value, setValue] = useState(todo.status);
  const changeHandler = async (value: string) => {
    setValue(value);
    try {
      const res = await fetch(`/api/todo/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: value }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Select onValueChange={changeHandler} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="waiting">
            <div className="flex items-center gap-2">
              <div className={`rounded-full w-3 h-3 bg-yellow-300`} />
              <div>Waiting</div>
            </div>
          </SelectItem>
          <SelectItem value="in-progress">
            <div className="flex items-center gap-2">
              <div className={`rounded-full w-3 h-3 bg-blue-500`} />
              <div> In-progress</div>
            </div>
          </SelectItem>
          <SelectItem value="done">
            <div className="flex items-center gap-2">
              <div className={`rounded-full w-3 h-3 bg-emerald-500`} />
              <div>Done</div>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TodoStatus;
