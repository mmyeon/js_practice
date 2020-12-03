const toDoForm = document.querySelector("#js-toDoForm"),
  input = toDoForm.querySelector("input"),
  pendingListDOM = document.querySelector("#js-pendingList"),
  finishedListDOM = document.querySelector("#js-finishedList");

const PENDING = "pending";
const FINISHED = "finished";

function handleSubmit(e) {
  e.preventDefault();
  const pendingList = JSON.parse(localStorage.getItem(PENDING)) || [];

  const toDo = {
    id: pendingList.length + 1,
    text: input.value,
  };

  input.value = "";

  pendingList.push(toDo);
  savePendingToStorage(pendingList);
}

function savePendingToStorage(toDos) {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
  displayTaskToPendingList();
}

function saveFinishedToStorage(toDos) {
  localStorage.setItem(FINISHED, JSON.stringify(toDos));
  // displayTaskToPendingList();
}

function displayTaskToPendingList() {
  const pendingList = JSON.parse(localStorage.getItem(PENDING)) || [];

  pendingListDOM.innerHTML = "";

  pendingList.forEach((v) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");

    span.innerText = v.text;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", () => {
      deletePendingToDo(v.id);
    });

    checkBtn.innerText = "✅";
    checkBtn.addEventListener("click", () => {
      checkPendingToDos(v.id);
    });

    pendingListDOM.appendChild(li);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = v.id;
  });
}

function displayTaskToFinishedList() {
  const finishedList = JSON.parse(localStorage.getItem(FINISHED)) || [];

  finishedListDOM.innerHTML = "";

  finishedList.forEach((v) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");

    span.innerText = v.text;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", () => {
      deletePendingToDo(v.id);
    });

    checkBtn.innerText = "✅";
    checkBtn.addEventListener("click", () => {
      checkPendingToDos(v.id);
    });

    finishedListDOM.appendChild(li);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = v.id;
  });
}

function checkPendingToDos(id) {
  const pendingList = JSON.parse(localStorage.getItem(PENDING));
  const finishedList = JSON.parse(localStorage.getItem(FINISHED)) || [];

  console.log("finishedList", finishedList);
  const newPendingList = pendingList.filter(function (v) {
    return v.id !== parseInt(id);
  });

  const newFinishedList = pendingList.filter(function (v) {
    return v.id === parseInt(id);
  });

  console.log("newFinishedList", newFinishedList);

  if (finishedList !== null) {
    finishedList.push(newFinishedList[0]);
  }

  savePendingToStorage(newPendingList);
  displayTaskToPendingList();

  saveFinishedToStorage(finishedList);

  displayTaskToFinishedList();
}

function deletePendingToDo(id) {
  const pendingList = JSON.parse(localStorage.getItem(PENDING));

  const newPendingList = pendingList.filter(function (v) {
    return v.id !== parseInt(id);
  });

  savePendingToStorage(newPendingList);

  displayTaskToPendingList();
}

function init() {
  displayTaskToPendingList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
