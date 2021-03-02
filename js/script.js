// Select the Elements
const dateElement = document.getElementById("date");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Event Listener
document.addEventListener('keyup', getTodo);

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST= [];
 let id = 0;

// Show date
const date = new Date();
const dateformart = {weekday: "long", month:"short", day:"numeric"};
dateElement.innerHTML = date.toLocaleDateString("en-US" , dateformart);

//functions

// Open sidebar function
function sidebarOpen() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

//Close sidebar function
function sidebarClose() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Add to do function
function addToDo(todoItem, id, completed, deleted) {
  if(deleted){ return;}

  const complete = completed ? CHECK : UNCHECK;
  const line = completed ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="far ${complete} co" job="complete" id="${id}"></i>
                  <p class="text ${line}">${todoItem}</p>
                  <i class="fas fa-trash-alt de" job="delete" id="${id}"></i>
              </li>
              `;
  const position = "beforeend";
  todoList.insertAdjacentHTML(position, item);
}


// Add an item to the list after typing and hitting the enter key
function getTodo(event) {
  if (event.key === 'Enter'){
      const todoItem = todoInput.value;

      // If input isn't empty
      if(todoItem) {
          addToDo(todoItem, id, false, false);
          LIST.push({
              name: todoItem,
              id: id,
              completed: false,
              deleted: false,
              date: date,
          });
          //add(update) item to local storage
          localStorage.setItem("TODO", JSON.stringify(LIST));
          id++;
      }
      todoInput.value = "";
  }
}