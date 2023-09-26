import { DataInterface } from "../types/dataTypes";
import CheckmarkImage from "/images/checkmark.svg";

const renderTodos = (todos: DataInterface[]) => {
  const renderedItemArray = todos.map((todo) => {
    const className = todo.completed ? "completed" : "";
    const completionClass = todo.completed ? "checked" : "";
    return `
          <li data-id="${todo.id}" class="${className}">
              <span class="custom-checkbox">
                  <img class="check" src=${CheckmarkImage} width="22" height="22"></img>
                  <input class="real-checkbox" type="checkbox" ${completionClass} />
              </span>
              <label>${todo.text}</label>
              <span class="delete"></span>
          </li>
      `;
  });

  document.querySelector(".todo-list")!.innerHTML = renderedItemArray.join("");
};

const showNotification = () => {
  const notificationElement = document.createElement("div");

  notificationElement.classList.add("alert", "alert-success", "notification");
  notificationElement.setAttribute("role", "alert");
  notificationElement.innerHTML = "Todo item added";
  document.body.appendChild(notificationElement);

  setTimeout(() => {
    const notificationElement = document.querySelector(".notification");
    notificationElement!.parentNode!.removeChild(notificationElement!);
  }, 2000);
};

const clearNewTodoInput = () => {
  (document.querySelector(".new-todo") as HTMLInputElement).value = "";
  showNotification();
};

const getTodoId = (element: HTMLElement) => {
  return parseInt(
    element.dataset.id ||
      element.parentElement?.dataset.id ||
      element.parentElement?.parentElement?.dataset.id!,
    10
  );
};

export { renderTodos, clearNewTodoInput, getTodoId };
