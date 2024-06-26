import axios from "axios";
import { useEffect, useRef, useState } from "react";
type Todo = {
  id?: number;
  name?: string;
};
function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [todo, setTodo] = useState("");
  const [id, setId] = useState<number | undefined>(undefined);
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/todos`);
      setTodos(data);
    })();
  }, []);
  const setTodoInput = (todo: string) => {
    setTodo(todo);
  };
  const addTodo = async () => {
    const { data } = await axios.post(`http://localhost:3000/todos`, {
      name: todo,
    });
    setTodos((prev) => [...prev, data]);
    setTodo("");
    inputRef.current && inputRef.current.focus();
  };
  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos((prev) => {
      const result = prev.filter((todo) => todo.id != id);
      return result;
    });
  };
  const updateTodo = async () => {
    await axios.put(`http://localhost:3000/todos/${id}`, { name: todo });
    setTodos((prev) => {
      const result = prev.map((t) => {
        if (t.id == id) {
          t.name = todo;
        }
        return t;
      });
      return result;
    });
    setTodo("");
    setId(undefined);
  };
  return (
    <div className="flex flex-col items-start justify-center gap-5 m-5">
      <div className="flex items-center gap-2 h-10">
        <label
          htmlFor="todo"
          className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodoInput(e.target.value)}
            type="text"
            id="todo"
            placeholder="Công việc"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Công việc
          </span>
        </label>

        {id ? (
          <button
            onClick={updateTodo}
            className={"h-full px-5 bg-blue-500 rounded text-white"}
          >
            Cập nhập
          </button>
        ) : (
          <button
            onClick={addTodo}
            className="h-full px-5 bg-blue-500 rounded text-white"
          >
            Thêm
          </button>
        )}
      </div>

      <ul className="">
        {todos.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-[#333]">
            <input type="checkbox" className="peer" />
            <span className="peer-checked:line-through capitalize">
              {item.name}
            </span>
            <span
              onClick={() => deleteTodo(item.id as number)}
              className=" hidden peer-checked:inline-block cursor-pointer "
            >
              &times;
            </span>
            <span
              onClick={() => {
                setId(item.id);
                setTodo(item.name as string);
              }}
              className="hidden peer-checked:inline-block cursor-pointer"
            >
              Sửa
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
