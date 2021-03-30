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

//Variables
let LIST, id;

// get item from local storage
let todoData = localStorage.getItem("TODO_ITEMS");

// check if data is not empty
if(todoData){
    LIST = JSON.parse(todoData);
    id = LIST.length; // Set the id value to the last one in the list
    loadList(LIST); //Load the list to the user interface
}else {
    //if data is empty
    LIST = [];
    id = 0;
}

//Load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.completed, item.deleted, item.date);
        
    });
}

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
                  <i class="far ${complete} co" action="completed" id="${id}"></i>
                  <p class="text ${line}">${todoItem}</p>
                  <i class="fas fa-trash-alt de" action="delete" id="${id}"></i>
              </li>
              `;
  const position = "beforeend";
  todoList.insertAdjacentHTML(position, item);
}


// Add an item to the list
function getTodo(event) {
  if (event.key === 'Enter'){
      const todoItem = todoInput.value;

      // If input isn't empty
      if(todoItem) {
          addToDo(todoItem, id, false, false, date);
          LIST.push({
              name: todoItem,
              id: id,
              completed: false,
              deleted: false,
              date: date,
          });
          //add(update) item to local storage
          localStorage.setItem("TODO_ITEMS", JSON.stringify(LIST));
          id++;
      }
      todoInput.value = "";
  }
}

// Completed todo items
function completedToDO(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  
  LIST[element.id].completed = LIST[element.id].completed ? false : true;
}

// Remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].deleted = true;
}

// Target the items created dynamically
todoList.addEventListener("click", function(event){
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.action.value; // complete or delete

  if(elementJob === "completed") {
      completedToDO(element);
  }else if(elementJob ==="delete"){
      removeToDo(element);
  }
  //add(update) item to local storage
  localStorage.setItem("TODO_ITEMS", JSON.stringify(LIST)); 
});
