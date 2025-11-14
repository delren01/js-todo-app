const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const ulEl = document.getElementById("taskList");
const openDialog = document.getElementById("openDialogBtn");
const closeDialog = document.getElementById("closeDialogBtn");
const dialog = document.getElementById("myDialog");

// Modal Controls
closeDialog.addEventListener("click", () => {
    dialog.close();
});

// * Closes modal if user clicks on dialog's backdrop
dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        dialog.close();
    }
});

function addTask() {
    // * Stores the value of the <input>
    let inputValue = taskInput.value;
    if (inputValue.trim() === "") { // checks whether the input value is empty and shows a modal
        dialog.showModal();
    } else {
        // * Creates the main container <li> when addBtn is clicked.
        const newLi = document.createElement("li");
        // * Groups the buttons (Edit, Complete, Delete) together 
        let buttonGroup = document.createElement("div");
        buttonGroup.classList.add("btn-grp");
        // * Create DELETE button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        // * Create COMPLETE button
        let completeButton = document.createElement("button");
        completeButton.textContent = "Complete"; 
        completeButton.classList.add("complete-btn");
        // * Create task text <span> element
        let spanContainer = document.createElement("span");
        spanContainer.classList.add("task-text");
        spanContainer.textContent = inputValue;
        // * Create EDIT button
        let editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "Edit";
        // * Append the newly created <li> into the <ul> element.
        ulEl.append(newLi);
        // * <span> and <div> goes inside the <li>
        newLi.appendChild(spanContainer);
        newLi.appendChild(buttonGroup);
        // * All buttons then go inside that newly created <div> with a class 'btn-grp'
        buttonGroup.append(editButton);
        buttonGroup.appendChild(completeButton);
        buttonGroup.append(deleteButton); // Appends the delete button INSIDE the task item (next to it)
        // * Clears the input after adding the task.
        taskInput.value = '';
    }
}

// * Event Delegation (handles all Edit, Complete, Delete clicks);
ulEl.addEventListener("click", (e) => {
    // * DELETE button logic
    if (e.target.classList.contains("delete-btn")) {
        // Traverse from the bottom up to the <div class="btn-grp">
        let parentEl = e.target.parentElement;
        // From <div class="btn-grp">, it goes up to the <li> where our task text is.
        let taskToDelete = parentEl.parentElement;
        taskToDelete.remove();
    }
    // * COMPLETE button logic
    if (e.target.classList.contains("complete-btn")) {
        // Traverse from the bottom up to the <div class="btn-grp">
        let parentEl = e.target.parentElement;
        // Locates the target <span> el containing the text we need
        let taskToStrike = parentEl.parentElement;
        let textEl = taskToStrike.querySelector(".task-text");
        // * Toggle the .completed class for strikethrough/red color change
        textEl.classList.toggle("completed");
    }
    // * EDIT button logic
    if(e.target.classList.contains("edit-btn")) {
        let parentEl = e.target.parentElement;
        let taskToEdit = parentEl.parentElement;
        // 1. Prepare a new input element
        let newTextInput = document.createElement("input");
        newTextInput.setAttribute("type", "text");
        // 2. Retrieve old <span> and store its completion status
        let taskEl =  taskToEdit.querySelectorAll('.task-text');
        newTextInput.value = taskEl[0].textContent; // * Assign current text to the new input value
        let hasCompleted = taskEl[0].classList.contains("completed");  // false: Store status before swap
        // 3. Perform the swap: Replace <span> with the new <input> element
        taskEl[0].replaceWith(newTextInput);
        newTextInput.focus();
    
        // 4. Implement saving logic (on keyup event for the new input)
        newTextInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                // a. Create the replacement <span>
                let newSpanEl = document.createElement("span");
                newSpanEl.classList.add("task-text") // Re-add mandatory class
                newSpanEl.textContent = newTextInput.value;
                // b. Preserve the 'completed' status using the stored boolean
                if (hasCompleted) {
                    newSpanEl.classList.add("completed");
                }
                // c. Final swap: Replace <input> with the new <span>
                newTextInput.replaceWith(newSpanEl);
            }
        })
    }
});

addBtn.addEventListener("click", addTask);

