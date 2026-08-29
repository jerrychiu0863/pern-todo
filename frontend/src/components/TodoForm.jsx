import { useRef } from "react";
import { todoApi } from "../api/todo";

function TodoForm({ setTodos, setError }) {
  const inputRef = useRef();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const description = inputRef.current.value;
    try {
      const newTodo = await todoApi.create(description);
      setTodos((todos) => [...todos, newTodo]);
      inputRef.current.value = "";
    } catch (err) {
      console.log(err);
      setError("Failed to add new task!");
    }
  };

  return (
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
  );
}

export default TodoForm;
