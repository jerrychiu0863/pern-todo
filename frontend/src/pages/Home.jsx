import { useState, useEffect } from "react";
import { useTodo } from "../hooks/useTodo";

import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import { todoApi } from "../api/todo";

function Home() {
  const { todos, addTodo, updateTodo, deleteTodo, error, loading } = useTodo();

  return (
    <>
      <div className="p-[16px]">
        <TodoForm addTodo={addTodo} />
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
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}
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
