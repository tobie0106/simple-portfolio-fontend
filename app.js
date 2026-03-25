const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const STORAGE_KEY = "portfolio-todo";

function getTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();
  todoList.innerHTML = "";

  if (todos.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Nothing to do! Add some tasks above.";
    empty.style.color = "#6b7280";
    todoList.appendChild(empty);
    return;
  }

  todos.forEach((todo, index) => {
    const item = document.createElement("li");
    item.className = "todo-item" + (todo.done ? " completed" : "");

    const content = document.createElement("span");
    content.textContent = todo.text;
    item.appendChild(content);

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = todo.done ? "Undo" : "Complete";
    completeBtn.addEventListener("click", () => toggleDone(index));
    actions.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index));
    actions.appendChild(deleteBtn);

    item.appendChild(actions);
    todoList.appendChild(item);
  });
}

function addTodo(text) {
  const todos = getTodos();
  todos.push({ text, done: false });
  saveTodos(todos);
  renderTodos();
}

function toggleDone(index) {
  const todos = getTodos();
  if (!todos[index]) return;
  todos[index].done = !todos[index].done;
  saveTodos(todos);
  renderTodos();
}

function deleteTodo(index) {
  const todos = getTodos();
  if (!todos[index]) return;
  todos.splice(index, 1);
  saveTodos(todos);
  renderTodos();
}

todoForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = todoInput.value.trim();
  if (!value) return;
  addTodo(value);
  todoInput.value = "";
});

renderTodos();
