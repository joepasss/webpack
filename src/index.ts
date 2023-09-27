import initialData from "./data.json" assert { type: "json" };
import { dataInterface } from "./types";

let data = initialData;

const getAllTodos = () => {
  return data;
};

const addTodo = (todo: dataInterface) => {
  data.push(todo);
};

const removeTodo = (id: dataInterface["id"]) => {
  data = data.filter((item) => {
    return item.id !== id;
  });
};

const updateTodo = (
  id: dataInterface["id"],
  completed: dataInterface["completed"]
) => {
  const itemIndex = data.findIndex((value) => {
    return value.id === id;
  });

  data[itemIndex].completed = completed;
};

const renderTodos = (todos: dataInterface[]) => {
  const renderedItemArr = todos.map((todo) => {
    const className = todo.completed ? "completed" : "";
    const checked = todo.completed ? "checked" : "";

    return `
      <li data-id="${todo.id}" class="${className}">
        <span class="checkbox">
          <img class="check" src="../images/check.svg" />
          <input type="checkbox" class="real-checkbox" ${checked} />
        </span>
        <label class=${className}>${todo.text}</label>
        <span class="delete" />
      </li>
    `;
  });

  document.querySelector(".todo-list")!.innerHTML = renderedItemArr.join("");
};

const clearNewTodoInput = () => {
  (document.querySelector(".new-todo") as HTMLInputElement).value = "";
};

const getTodoId = (element: HTMLElement) => {
  return parseInt(
    element.dataset.id ||
      element.parentElement?.dataset.id ||
      element.parentElement?.parentElement?.dataset.id!,
    10
  );
};

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

window.addEventListener("load", onLoadEventHandler);

document.addEventListener("change", (event: Event) => {
  if ((event.target as HTMLElement).classList.contains("new-todo")) {
    newTodoEventHandler(event);
  }
});

document.addEventListener("click", (event: Event) => {
  if ((event.target as HTMLElement).classList.contains("delete")) {
    removeTodoEventHandler(event);
  }

  if ((event.target as HTMLElement).classList.contains("real-checkbox")) {
    toggleTodoEventListener(event);
  }
});
