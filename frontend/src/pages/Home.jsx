import { useState, useEffect, useRef } from "react";
import axios from "axios";

import TodoItem from "../components/TodoItem";

function Home() {
  const [todos, setTodos] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [update, setUpdate] = useState("");
  const inputRef = useRef("");
  const [error, setError] = useState(null);
  console.log(import.meta.env.VITE_TODO_URL);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_TODO_URL}all`);
      const todos = response.data;
      setTodos(todos);
      // console.log(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to Fetch Todos!");
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_TODO_URL}`, {
        description: inputRef.current.value,
      });
      const newTodo = response.data;
      setTodos((todos) => [...todos, newTodo]);
      // console.log(newTodo);
      inputRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  const onTodoUpdate = async (todo, type) => {
    const { todo_id, description, completed } = todo;
    const updatedDescription = type === "description" ? update : description;
    const updatedCompleted = type === "completed" ? !completed : completed;
    try {
      await axios.put(`${import.meta.env.VITE_TODO_URL}${todo_id}`, {
        description: updatedDescription,
        completed: updatedCompleted,
      });
      const updatedTodo = todos.map((todo) => {
        if (todo.todo_id === todo_id) {
          return {
            ...todo,
            description: updatedDescription,
            completed: updatedCompleted,
          };
        }
        return todo;
      });
      setUpdatingId(null);

      setTodos((todos) => [...updatedTodo]);
    } catch (err) {
      console.log(err);
      setError("Failed to Update Todo!");
    }
  };

  const onTodoDelete = async (todoId) => {
    try {
      if (window.confirm("Are you sure to delete?")) {
        const response = await axios.delete(
          `${import.meta.env.VITE_TODO_URL}${todoId}`,
        );
        const updatedTodos = todos.filter((todo) => {
          if (todo.todo_id !== todoId) {
            return todo;
          }
        });
        setTodos(updatedTodos);
      } else {
        console.log("no");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdatingTodo = (todo) => {
    const { todo_id, description } = todo;
    setUpdatingId(todo_id);
    setUpdate(description);
  };

  const onUpdateCancel = () => {
    setUpdate("");
    setUpdatingId(null);
  };

  return (
    <>
      <div>
        <form className="flex mb-[16px]" onSubmit={onFormSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="border border-gray-300 flex-1 rounded-sm px-[8px]"
            placeholder="Add new todo"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 px-[16px] py-[8px] text-white rounded-sm ml-[8px]"
          >
            Add
          </button>
        </form>
        <div>
          {error && <p className="text-bold text-red-500">{error}</p>}
          {todos.length === 0 && <p>Add new tasks!</p>}
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.todo_id}>
                  <div className="border border-gray-300  rounded-sm mb-[4px] px-[8px] py-[8px] flex justify-between items-center">
                    {todo.todo_id === updatingId ? (
                      <div className="flex justify-between items-center w-full">
                        <div className="flex-1 mr-[8px]">
                          <input
                            type="text"
                            className="border border-gray-300 flex-1 rounded-sm px-[8px] py-[4px] w-full"
                            value={update}
                            onChange={(e) => setUpdate(e.target.value)}
                          />
                        </div>
                        <div>
                          <button
                            className="bg-blue-500 px-[16px] py-[8px] text-white rounded-sm mr-[4px]"
                            onClick={() => onTodoUpdate(todo, "description")}
                          >
                            Save
                          </button>
                          <button
                            className="border border-red-500 text-red-500 px-[16px] py-[8px] rounded-sm"
                            onClick={onUpdateCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <TodoItem
                        todo={todo}
                        onUpdatingTodo={onUpdatingTodo}
                        onTodoDelete={onTodoDelete}
                        onTodoUpdate={onTodoUpdate}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
