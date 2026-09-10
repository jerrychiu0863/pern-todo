import { useState } from "react";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftDescription, setDraftDescription] = useState(todo.description);

  const onTodoUpdate = async (todoId, payload) => {
    if (!draftDescription || draftDescription.trim() === todo.description) {
      setIsEditing(false);
      setDraftDescription(todo.description);
      return;
    }
    await updateTodo(todoId, payload);
    setIsEditing(false);
  };

  const toggleCompleted = async (todoId, payload) => {
    await updateTodo(todoId, payload);
  };

  const onTodoDelete = async (todoId) => {
    if (window.confirm("Are you sure to delete?")) {
      await deleteTodo(todoId);
    }
  };

  if (isEditing) {
    return (
      <div className="flex justify-between items-center w-full">
        <div className="flex-1 mr-[8px]">
          <input
            type="text"
            className="border border-gray-300 flex-1 rounded-sm px-[8px] py-[4px] w-full"
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 px-[16px] py-[8px] text-white rounded-sm mr-[4px]"
            onClick={() => {
              onTodoUpdate(todo.todo_id, {
                description: draftDescription,
                completed: todo.completed,
              });
            }}
          >
            Save
          </button>
          <button
            className="border border-red-500 text-red-500 px-[16px] py-[8px] rounded-sm"
            onClick={() => {
              setDraftDescription(todo.description);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center">
        <div className="mr-[8px]">
          <button
            className={`border border-gray-300 h-[30px] w-[30px] rounded-sm text-white ${todo.completed && "bg-blue-500"}`}
            onClick={() =>
              toggleCompleted(todo.todo_id, {
                description: todo.description,
                completed: !todo.completed,
              })
            }
          >
            {todo.completed && "✓"}
          </button>
        </div>
        <div>
          <p
            className={`font-bold text-gray-600 ${todo.completed && "line-through"}`}
          >
            {todo.description}
          </p>
          <p className="text-[12px]">{todo.created_at}</p>
        </div>
      </div>
      <div>
        <button
          className="bg-blue-500 px-[16px] py-[8px] text-white rounded-sm mr-[4px]"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="border border-red-500 text-red-500 px-[16px] py-[8px] rounded-sm"
          onClick={() => onTodoDelete(todo.todo_id)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default TodoItem;
