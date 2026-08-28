function TodoItem({ todo, onUpdatingTodo, onTodoDelete, onTodoUpdate }) {
  return (
    <>
      <div className="flex items-center">
        <div className="mr-[8px]">
          <button
            className={`border border-gray-300 h-[30px] w-[30px] rounded-sm text-white ${todo.completed && "bg-blue-500"}`}
            onClick={() => onTodoUpdate(todo, "completed")}
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
          to={`/todo/${todo.todo_id}`}
          onClick={() => onUpdatingTodo(todo)}
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
