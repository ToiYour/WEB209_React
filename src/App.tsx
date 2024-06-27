/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState({
    open: false,
    id: null,
  });

  const RegisterForm = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<{ name: string; id?: number; action?: string }>();
    return { register, handleSubmit, reset, errors };
  };
  const forms = {
    add: RegisterForm(),
    update: RegisterForm(),
  };
  useEffect(() => {
    fetch(`http://localhost:3000/todos`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  const handleDelete = (id: number) => {
    if (confirm("Bạn chắc chắn xoá chứ")) {
      fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setTodos(todos.filter((p) => p.id != id));
        });
    }
  };
  const handleAdd = (name: string) => {
    fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prev) => [...prev, data]);
      });
  };
  const handleUpdate = (id: number, name: string) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prev) =>
          prev.map((todo) => {
            if (todo.id == id) {
              todo.name = name;
            }
            return todo;
          })
        );
      });
  };
  const onSubmit = (payload: {
    name: string;
    id?: number;
    action?: string;
  }) => {
    if (payload.action == "add") {
      handleAdd(payload.name);
      forms.add.reset();
    } else {
      handleUpdate(payload.id!, payload.name);
      forms.update.reset();
      setIsOpen({ open: false, id: null });
    }
  };
  return (
    <div className="mt-10 mx-auto w-1/2 space-y-10">
      <form
        className="flex items-center gap-2 "
        onSubmit={forms.add.handleSubmit(onSubmit)}
      >
        <input
          {...forms.add.register("name", {
            required: "Vui lòng nhập công việc",
          })}
          type="text"
          placeholder="Thêm công việc..."
          className={clsx(
            "border  p-2 rounded outline-none",
            forms.add.errors?.name ? "border-red-500" : "border-gray-300"
          )}
        />
        <input
          type="text"
          defaultValue={"add"}
          {...forms.add.register("action")}
          hidden
        />
        <button
          type="submit"
          className="text-white py-2 px-5 bg-blue-500 rounded"
        >
          Thêm mới
        </button>
      </form>
      <ul className="space-y-5">
        {todos.map((t: any) => (
          <li key={t.id}>
            <span
              onClick={() => setIsOpen({ open: true, id: t.id })}
              className="cursor-pointer"
            >
              {t.name}{" "}
            </span>
            <span onClick={() => handleDelete(t.id)} className="cursor-pointer">
              &times;
            </span>
            {isOpen.open && isOpen.id == t.id && (
              <form
                onSubmit={forms.update.handleSubmit(onSubmit)}
                className="mt-1 flex items-center gap-2"
              >
                <input
                  {...forms.update.register("name", {
                    required: "Vui lòng nhập công việc",
                  })}
                  type="text"
                  placeholder="Thêm công việc..."
                  className={clsx(
                    "border  p-2 rounded outline-none",
                    forms.update.errors?.name
                      ? "border-red-500"
                      : "border-gray-300"
                  )}
                  defaultValue={t.name}
                />
                <input
                  type="text"
                  {...forms.update.register("id")}
                  defaultValue={t.id}
                  hidden
                />
                <input
                  type="text"
                  defaultValue={"add"}
                  {...forms.add.register("action")}
                  hidden
                />
                <div className="flex items-center *:px-5 *:py-2 *:text-white *:rounded space-x-5">
                  <button
                    type="button"
                    onClick={() => setIsOpen({ open: false, id: null })}
                    className="bg-red-500"
                  >
                    Huỷ
                  </button>
                  <button type="submit" className="bg-blue-500">
                    Cập nhập
                  </button>
                </div>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
