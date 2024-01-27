let inputs = document.getElementById("inp");
let text = document.querySelector(".text");


document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function saveTasksToLocalStorage() {
    let tasks = Array.from(text.children).map(taskElement => taskElement.firstChild.textContent.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText) {
    let newEle = document.createElement("ul");
    newEle.innerHTML = `${taskText} <i class="fa-solid fa-trash"></i> 
        <span class="icon-space"></span> <!-- Spacer -->
         <i class="fa-solid fa-pen"></i>`;
    text.appendChild(newEle);

    newEle.querySelector(".fa-trash").addEventListener("click", remove);
    newEle.querySelector(".fa-pen").addEventListener("click", update);

    function remove() {
        newEle.remove();
        saveTasksToLocalStorage();
    }

    function update() {
        let updatedTask = prompt("Update the task:", taskText);
        if (updatedTask !== null) {
            taskText = updatedTask;
            newEle.innerHTML = `${taskText} <i class="fa-solid fa-trash"></i>
                 <span class="icon-space"></span><!-- Spacer -->
                <i class="fa-solid fa-pen"></i>`;
            newEle.querySelector(".fa-trash").addEventListener("click", remove);
            newEle.querySelector(".fa-pen").addEventListener("click", update);
            saveTasksToLocalStorage();
        }
    }
}

function Add() {
    if (inputs.value === "") {
        alert("Please Enter Task");
    } else {
        createTaskElement(inputs.value);
        inputs.value = "";
        saveTasksToLocalStorage();
    }
}
