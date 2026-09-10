import { useState, useEffect } from "react";
import { todoApi } from "../api/todo";

export function useTodo() {
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
      console.error(err);
      setError("Failed to Fetch Todos!");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (description) => {
    setError(null);
    try {
      const newTodo = await todoApi.create(description);
      setTodos((todos) => [...todos, newTodo]);
    } catch (err) {
      console.error(err);
      setError("Failed to add todo!");
    }
  };

  const updateTodo = async (todoId, payload) => {
    setError(null);
    try {
      await todoApi.update(todoId, payload);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.todo_id === todoId ? { ...todo, ...payload } : todo,
        ),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to Update Todo!");
    }
  };

  const deleteTodo = async (todoId) => {
    setError(null);
    try {
      await todoApi.delete(todoId);
      setTodos((prev) => prev.filter((todo) => todo.todo_id !== todoId));
    } catch (err) {
      console.error(err);
      setError("Failed to Delete Todo!");
    }
  };

  return { todos, addTodo, updateTodo, deleteTodo, error, loading };
}
