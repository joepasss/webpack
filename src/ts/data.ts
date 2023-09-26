import initialData from "../todos.json";
import { DataInterface } from "../types/dataTypes";

let data: DataInterface[] = initialData;

const getAllTodos = () => {
  return data;
};

const addTodo = (todo: DataInterface) => {
  data.push(todo);
};

const removeTodo = (id: DataInterface["id"]) => {
  data = data.filter((item) => {
    return item.id !== id;
  });
};

const updateTodo = (
  id: DataInterface["id"],
  completed: DataInterface["completed"]
) => {
  const itemIndex = data.findIndex((value) => {
    return value.id === id;
  });

  data[itemIndex].completed = completed;
};

export { getAllTodos, addTodo, removeTodo, updateTodo };
