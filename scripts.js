// JSL03-2025 Task Management System
// Simple task management system with array manipulation and user interaction

// Initial task array with existing tasks
let tasks = [
    {
        id: 1,
        title: "Complete JavaScript Assignment",
        description: "Finish the array manipulation exercises",
        status: "done"
    },
    {
        id: 2,
        title: "Review Code",
        description: "Check and refactor previous projects",
        status: "in progress"
    },
    {
        id: 3,
        title: "Prepare for Meeting",
        description: "Gather documents and notes for team meeting",
        status: "done"
    }
];

// Maximum number of tasks that can be added
const MAX_NEW_TASKS = 3;
let newTasksAdded = 0;
  
/**
 * Function to get the next unique ID for a new task
 * @returns {number} The next incremental ID
 */
function getNextTaskId() {
    if (tasks.length === 0) {
        return 1;
    }
    // Find the highest ID in the current tasks array
    const highestId = Math.max(...tasks.map(task => task.id));
    return highestId + 1;
}

/**
 * Function to validate task input
 * @param {string} input - The input string to validate
 * @param {string} fieldName - The name of the field being validated
 * @returns {boolean} True if valid, false otherwise
 */
function validateTaskInput(input, fieldName) {
    if (!input || input.trim().length === 0) {
        alert(`${fieldName} cannot be empty. Please enter a valid ${fieldName.toLowerCase()}.`);
        return false;
    }
    return true;
}

/**
 * Function to validate task status
 * @param {string} status - The status input to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateTaskStatus(status) {
    const validStatuses = ['todo', 'in progress', 'done'];
    if (!validStatuses.includes(status.toLowerCase())) {
        alert(`Invalid status. Please enter one of: ${validStatuses.join(', ')}`);
        return false;
    }
    return true;
}

/**
 * Function to add a new task to the tasks array
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @param {string} status - Task status
 */
function addNewTask(title, description, status) {
    const newTask = {
        id: getNextTaskId(),
        title: title.trim(),
        description: description.trim(),
        status: status.toLowerCase().trim()
    };
    
    tasks.push(newTask);
    newTasksAdded++;
    
    console.log(`✅ Task "${title}" added successfully!`);
}

/**
 * Function to prompt user for task details and add the task
 */
function promptForNewTask() {
    // Check if we've reached the maximum number of new tasks
    if (newTasksAdded >= MAX_NEW_TASKS) {
        alert("There are enough tasks on your board, please check them in the console.");
        return false;
    }
    
    // Prompt for task title with validation
    let title;
    do {
        title = prompt("Enter the task title:");
        if (title === null) return false; // User cancelled
    } while (!validateTaskInput(title, "Title"));
    
    // Prompt for task description with validation
    let description;
    do {
        description = prompt("Enter the task description:");
        if (description === null) return false; // User cancelled
    } while (!validateTaskInput(description, "Description"));
    
    // Prompt for task status with validation
    let status;
    do {
        status = prompt("Enter the task status (todo, in progress, done):");
        if (status === null) return false; // User cancelled
    } while (!validateTaskInput(status, "Status") || !validateTaskStatus(status));
    
    // Add the new task
    addNewTask(title, description, status);
    return true;
}

/**
 * Function to filter and return only completed tasks
 * @returns {Array} Array of completed tasks
 */
function getCompletedTasks() {
    return tasks.filter(task => task.status === "done");
}

/**
 * Function to log all tasks to the console
 */
function logAllTasks() {
    console.log("\n" + "=".repeat(50));
    console.log("📋 ALL TASKS");
    console.log("=".repeat(50));
    
    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }
    
    tasks.forEach((task, index) => {
        console.log(`\n${index + 1}. Task ID: ${task.id}`);
        console.log(`   Title: ${task.title}`);
        console.log(`   Description: ${task.description}`);
        console.log(`   Status: ${task.status}`);
        console.log(`   ${getStatusEmoji(task.status)}`);
    });
    
    console.log("\n" + "=".repeat(50));
}

/**
 * Function to log only completed tasks to the console
 */
function logCompletedTasks() {
    const completedTasks = getCompletedTasks();
    
    console.log("\n" + "=".repeat(50));
    console.log("✅ COMPLETED TASKS");
    console.log("=".repeat(50));
    
    if (completedTasks.length === 0) {
        console.log("No completed tasks found.");
        return;
    }
    
    completedTasks.forEach((task, index) => {
        console.log(`\n${index + 1}. Task ID: ${task.id}`);
        console.log(`   Title: ${task.title}`);
        console.log(`   Description: ${task.description}`);
        console.log(`   Status: ${task.status} ✅`);
    });
    
    console.log(`\nTotal completed tasks: ${completedTasks.length}`);
    console.log("=".repeat(50));
}

/**
 * Helper function to get emoji based on task status
 * @param {string} status - The task status
 * @returns {string} Appropriate emoji
 */
function getStatusEmoji(status) {
    switch (status.toLowerCase()) {
        case 'done':
            return '✅ Completed';
        case 'in progress':
            return '🔄 In Progress';
        case 'todo':
            return '📝 To Do';
        default:
            return '❓ Unknown Status';
    }
}

/**
 * Main function to run the task management system
 */
function runTaskManagementSystem() {
    console.log("🚀 Welcome to the Task Management System!");
    console.log(`You can add up to ${MAX_NEW_TASKS} new tasks.`);
    
    // Display initial tasks
    logAllTasks();
    logCompletedTasks();
    
    // Allow user to add new tasks
    let continueAdding = true;
    while (continueAdding && newTasksAdded < MAX_NEW_TASKS) {
        const remainingTasks = MAX_NEW_TASKS - newTasksAdded;
        const addTask = confirm(`Would you like to add a new task? (${remainingTasks} remaining)`);
        
        if (addTask) {
            continueAdding = promptForNewTask();
        } else {
            continueAdding = false;
        }
    }
    
    // Display final results
    console.log("\n🎉 Task Management Session Complete!");
    console.log(`Total tasks added: ${newTasksAdded}`);
    
    // Log all tasks and completed tasks after adding new ones
    logAllTasks();
    logCompletedTasks();
}

// Run the task management system
runTaskManagementSystem();