import { useParams } from "react-router";

function EditTodo() {
  const params = useParams();
  console.log(params);
  return <div>Edit Todo</div>;
}

export default EditTodo;
