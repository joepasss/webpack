/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import {
  onLoadEventHandler,
  newTodoEventHandler,
  removeTodoEventHandler,
  toggleTodoEventListener,
} from "./eventHandlers";
import "../styles/index.scss";

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
