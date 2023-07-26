console.log("pratik");

const create__todo = document.querySelector(".create__todo");
const task__container = document.querySelector(".tasks__container");
const total__task = document.querySelector(".total__task");

let task;

create__todo.addEventListener("keyup", function (event) {
  task = this.value;
  if (event.key === "Enter") {
    if (task.length === 0) {
      return;
    } else {
      add_task(task);
      this.value = "";
    }
  }
});

// SAVE
const save = function () {
  let data = [];
  const notes = document.querySelectorAll(".our__task");

  notes.forEach((item, ind) => {
    data.push(item.value);
  });

  localStorage.setItem("task", JSON.stringify(data));
};
// ------------------

// ADD TASK
const add_task = function (t) {
  const note = document.createElement("div");
  note.className = `taken__task flex common`;
  note.innerHTML = `
  <span class="circle"></span>
  <input
    type="text"
    value="${t}"
    readonly
    class="our__task"
  />
  <img
    src="images/icon-cross.svg"
    class="todo__icon"
    alt="Cross"
  />
  `;

  task__container.append(note);
  save();

  // TOTAL TASK
  const total_t = function () {
    let notes = document.querySelectorAll(".taken__task");
    total__task.textContent = notes.length;
  };
  total_t();

  // TASK LEFT
  const task__left = function (left) {
    let notes = document.querySelectorAll(".taken__task");
    total__task.textContent = `${notes.length - left}`;
  };

  // DELETE task
  note.querySelector(".todo__icon").addEventListener("click", function () {
    note.remove();
    save();
    total_t();
  });

  // CHECK
  note.querySelector(".circle").addEventListener("click", function () {
    note.querySelector(".circle").classList.toggle("circle--active");

    let circle_active = document.querySelectorAll(".circle--active");
    task__left(circle_active.length);
  });
};

// Reload save task
(function () {
  const lsnote = JSON.parse(localStorage.getItem("task"));
  if (lsnote === null) {
    return;
  } else {
    lsnote.forEach((item, ind) => {
      add_task(lsnote[ind]);
    });
  }
})();
