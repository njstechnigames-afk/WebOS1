function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));  

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const notesIcon = document.getElementById("notes-icon");

notesIcon.addEventListener("dblclick", () => {
    openWindow(notesScreen);
    notesScreen.style.zIndex = highestZIndex++;
});

const storeIcon = document.getElementById("store-icon");

storeIcon.addEventListener("dblclick", () => {
    openWindow(storeScreen);
    storeScreen.style.zIndex = highestZIndex++;
});

var selectedIcon = undefined

var welcomeScreen = document.querySelector("#welcome")

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

var storeScreen = document.querySelector("#store")

var storeScreenClose = document.querySelector("#storeclose")

var biggestIndex = 1;

let highestZIndex = 1;

function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "block"
}

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

function handleIconTap(element) {
  if (element.classList.contains("thechosenone")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}

function handleWindowTap(element) {
    element.style.zIndex = highestZIndex++; 
}

dragElement(document.querySelector("#notes"))

dragElement(document.querySelector("#store"))

closewindow.addEventListener("click", function() {
  closeWindow(notesScreen);
})

closewindow2.addEventListener("click", function() {
  closeWindow(storeScreen);
})

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

addWindowTapHandling(welcome)

addWindowTapHandling(notes)

addWindowTapHandling(store)

const terminalScreen = document.getElementById("terminal");
const terminalIcon = document.getElementById("terminal-icon");
const terminalClose = document.getElementById("terminalclose");
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

// Open & Close bindings
terminalIcon.addEventListener("dblclick", () => {
    openWindow(terminalScreen);
    terminalScreen.style.zIndex = highestZIndex++;
    terminalInput.focus();
});

terminalClose.addEventListener("click", () => {
    closeWindow(terminalScreen);
});

addWindowTapHandling(terminalScreen);
dragElement(terminalScreen);

// Command Line Logic
terminalInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let command = terminalInput.value.trim();
        terminalOutput.innerHTML += `user@NicksterOS:~$ ${command}<br>`;
        
        // Process commands
        if (command === "help") {
            terminalOutput.innerHTML += `Available commands: clear, help, date, echo [text]<br>`;
        } else if (command === "clear") {
            terminalOutput.innerHTML = "";
        } else if (command === "date") {
            terminalOutput.innerHTML += `${new Date()}<br>`;
        } else if (command.startsWith("echo ")) {
            terminalOutput.innerHTML += `${command.slice(5)}<br>`;
        } else if (command !== "") {
            terminalOutput.innerHTML += `Command not found: ${command}<br>`;
        }
        
        terminalInput.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});