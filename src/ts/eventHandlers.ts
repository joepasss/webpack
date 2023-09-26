import { getAllTodos, addTodo, removeTodo, updateTodo } from "./data";
import { renderTodos, clearNewTodoInput, getTodoId } from "./ui";

const onLoadEventHandler = () => {
  renderTodos(getAllTodos());
};

const newTodoEventHandler = (event: Event) => {
  let text = (event.target as HTMLInputElement).value;

  addTodo({
    id: Date.now(),
    text: text,
    completed: false,
  });

  renderTodos(getAllTodos());
  clearNewTodoInput();
};

const removeTodoEventHandler = (event: Event) => {
  const id = getTodoId(event.target as HTMLElement);

  removeTodo(id!);
  renderTodos(getAllTodos());
};

const toggleTodoEventListener = (event: Event) => {
  const id = getTodoId(event.target as HTMLElement);
  const isCompleted = (event.target as HTMLInputElement).checked;

  updateTodo(id!, isCompleted);
  renderTodos(getAllTodos());
};

export {
  onLoadEventHandler,
  newTodoEventHandler,
  removeTodoEventHandler,
  toggleTodoEventListener,
};
