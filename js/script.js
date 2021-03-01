// Select the Elements
const dateElement = document.getElementById("date");

// Event Listener



// Show date
const date = new Date();
const dateformart = {weekday: "long", month:"short", day:"numeric"};
dateElement.innerHTML = date.toLocaleDateString("en-US" , dateformart);

//functions
function sidebarOpen() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function sidebarClose() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}
