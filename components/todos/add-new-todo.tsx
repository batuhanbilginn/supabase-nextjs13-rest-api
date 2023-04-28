"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export function AddNewTodo() {
  const [task, setTask] = useState("");
  const ref = useRef<HTMLButtonElement>(null);

  // Add TODO Handler
  const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Write your code here
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({ task }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(data.message);
      }

      const data = await response.json();
      console.log(data);
      setTask("");
      ref.current?.click();
    } catch (error) {}
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={ref} variant="outline">
          Add Todo <Plus size="12" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            You can add todo by filling the form below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addTodoHandler} className="grid gap-4 py-4">
          <div className="flex flex-col gap-3 ">
            <Label htmlFor="task">Task</Label>
            <Input
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
              id="name"
              className="col-span-3"
            />
          </div>
          <Button className="w-full" type="submit">
            Add Todo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
