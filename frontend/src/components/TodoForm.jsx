import { useRef } from "react";

function TodoForm({ addTodo }) {
  const inputRef = useRef();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const description = inputRef.current.value;

    await addTodo(description);
    inputRef.current.value = "";
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
