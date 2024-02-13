// Retrieve task list from local storage or initialize an empty array if not present
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks from the stored task list
function renderTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks

    // Iterate through the tasks array and create task elements
    tasks.forEach(function(task) {
        let newTask = document.createElement("li");
        newTask.className = "tasks";
        newTask.innerHTML = `
            <input type="checkbox" class="task-complete" ${task.completed ? "checked" : ""}>
            <span class="task" ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.name}</span>
            <button class="delete-btn"></button>
        `;
        taskList.appendChild(newTask);

        // Attach event listeners for checkbox and delete button
        attachCheckBoxListener(newTask.querySelector(".task-complete"));
        attachDeleteButtonListener(newTask.querySelector(".delete-btn"));
    });
}

// Call renderTasks to initially render tasks from local storage
renderTasks();

document.getElementById("add-task-button").addEventListener("click", function() {
    let newTaskInput = document.getElementById("input-task").value.trim();
    if (newTaskInput !== "") { // check a task name was given
        // Add the new task to the task list array
        tasks.push({ name: newTaskInput, completed: false });
        // Save the updated task list to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Render the tasks again to reflect the changes
        renderTasks();
        document.getElementById("input-task").value = ""; // Clear the input field
    } else {
        alert("Please enter a valid task name.");
    }
});

function attachCheckBoxListener(checkbox) {
    checkbox.addEventListener("change", function() {
        let taskSpan = this.parentElement.querySelector(".task");
        let taskIndex = Array.from(taskSpan.parentElement.parentElement.children).indexOf(taskSpan.parentElement);
        tasks[taskIndex].completed = this.checked; // Update the completed status in the tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated task list to local storage
        if (this.checked) {
            taskSpan.style.textDecoration = "line-through";
        } else {
            taskSpan.style.textDecoration = "none";
        }
    });
}

function attachDeleteButtonListener(deleteButton) {
    deleteButton.addEventListener("click", function() {
        let taskToRemove = this.parentElement;
        let taskIndex = Array.from(taskToRemove.parentElement.children).indexOf(taskToRemove);
        tasks.splice(taskIndex, 1); // Remove the task from the tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated task list to local storage
        taskToRemove.remove(); // Remove the task from the DOM
    });
}