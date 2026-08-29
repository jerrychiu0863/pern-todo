import { useState, useEffect } from "react";

import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import { todoApi } from "../api/todo";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const todos = await todoApi.getAll();
      setTodos(todos);
    } catch (err) {
      console.log(err);
      setError("Failed to Fetch Todos!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <TodoForm setTodos={setTodos} setError={setError} />
        {error && <p className="text-bold text-red-500">{error}</p>}
        {loading && <div>Loading</div>}
        {!loading && todos.length === 0 && <p>Add new task!</p>}
        <div>
          <ul>
            {todos.map((todo) => {
              return (
                <li key={todo.todo_id}>
                  <div className="border border-gray-300  rounded-sm mb-[4px] px-[8px] py-[8px] flex justify-between items-center">
                    <TodoItem
                      todo={todo}
                      setError={setError}
                      setTodos={setTodos}
                    />
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
