import TodoList from "@/components/todos/todo-list";
import Header from "@/components/ui/navigation/header";

export default function Home() {
  return (
    <main className="w-full h-screen">
      {/* Container */}
      <div className="w-full px-8 py-20 mx-auto max-w-7xl">
        <Header />
        <TodoList />
      </div>
    </main>
  );
}
