// "658c0b649377c7caaf0df54f";
const baseURL = "https://todos.routemisr.com/";
const apiEndpoint = "api/v1/todos/";
const apiKey = "6596ead82681618c591bab71";
const addBtn = document.querySelector("button");
const todoTitle = document.getElementById("title");

addBtn.addEventListener("click", addTodo);

async function addTodo() {
  if (todoTitle.value === "") {
    alert("You must type something");
  } else {
    const todo = {
      title: todoTitle.value,
      apiKey: apiKey,
    };

    let api = await fetch(`${baseURL}${apiEndpoint}`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await api.json();
    console.log(response);

    getTodo();
  }
  todoTitle.value = "";
}

async function getTodo() {
  let api = await fetch(`${baseURL}${apiEndpoint}${apiKey}`);
  let { todos } = await api.json();
  console.log(todos);
  display(todos);
  getMarkedId();
  getDeleteId();
}

function display(list) {
  let box = "";
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    box += `             <li class="d-flex justify-content-between py-3 align-content-center">
    <div>
      <input
        id="${element._id}"
        type="checkbox"
        class="item"
        data-id="${element._id}"
        ${element.completed ? "checked" : ""}
      />
      <label class="break me-5 ${
        element.completed ? "text-decoration-line-through" : ""
      } " for="${element._id}" 
        >${element.title}</label
      >
    </div>

    <i
      class="fa-solid fa-xmark fs-5  closeBtn "
      data-id="${element._id}"
    ></i>
  </li>`;
  }
  document.getElementById("list").innerHTML = box;
}

async function markTodo(id) {
  const todo = {
    todoId: id,
  };

  let api = await fetch(`${baseURL}${apiEndpoint}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let response = await api.json();
  console.log(response);
}

async function deleteTodo(id) {
  const todo = {
    todoId: id,
  };

  let api = await fetch(`${baseURL}${apiEndpoint}`, {
    method: "DELETE",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let response = await api.json();
  console.log(response);
  getTodo();
}

function getMarkedId() {
  const items = Array.from(document.querySelectorAll(".item"));

  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    element.addEventListener("click", function (e) {
      id = this.getAttribute("data-id");
      console.log(id);
      const label = document.querySelector(`label[for="${id}"]`);
      label.classList.add("checked");

      markTodo(id);
    });
  }
}

function getDeleteId() {
  const items = Array.from(document.querySelectorAll(".closeBtn"));

  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    element.addEventListener("click", function () {
      id = this.getAttribute("data-id");
      deleteTodo(id);
    });
  }
}

getTodo();
