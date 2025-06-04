// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Temperature Converter Functions (Project 1)
function updateFormula() {
    const conversionType = document.getElementById("conversion-type").value;
    const formulaElement = document.getElementById("formula");

    if (conversionType === "fToC") {
        formulaElement.textContent = "Formula: (F - 32) × 5/9 = C";
    } else {
        formulaElement.textContent = "Formula: (C × 9/5) + 32 = F";
    }
}

function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("assessment");
    let assessment = "";
    let color = "";

    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db";
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5";
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3";
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71";
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12";
        } else {
            assessment = "Hot";
            color = "#e74c3c";
        }
    } else {
        if (temp <= 32) {
            assessment = "Very Cold";
            color = "#3498db";
        } else if (temp <= 49) {
            assessment = "Cold";
            color = "#7fb3d5";
        } else if (temp <= 67) {
            assessment = "Cool";
            color = "#a9cce3";
        } else if (temp <= 85) {
            assessment = "Moderate";
            color = "#2ecc71";
        } else if (temp <= 103) {
            assessment = "Warm";
            color = "#f39c12";
        } else {
            assessment = "Hot";
            color = "#e74c3c";
        }
    }

    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";
}

function convertTemperature() {
    const tempInput = document.getElementById("temperature").value;
    const conversionType = document.getElementById("conversion-type").value;
    const resultElement = document.getElementById("conversion-result");

    if (!conversionType) {
        resultElement.textContent = "Please select a conversion type.";
        return;
    }

    if (isNaN(tempInput) || tempInput.trim() === "") {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("assessment").textContent = "";
        return;
    }

    const temp = parseFloat(tempInput);
    let convertedTemp = 0;
    let resultText = "";

    if (conversionType === "fToC") {
        convertedTemp = (temp - 32) * 5 / 9;
        resultText = `${temp.toFixed(2)}°F = ${convertedTemp.toFixed(2)}°C`;
        assessTemperature(temp, "fahrenheit");
    } else {
        convertedTemp = (temp * 9 / 5) + 32;
        resultText = `${temp.toFixed(2)}°C = ${convertedTemp.toFixed(2)}°F`;
        assessTemperature(convertedTemp, "fahrenheit");
    }

    resultElement.textContent = resultText;
}

function clearConverter() {
    document.getElementById("temperature").value = "";
    document.getElementById("conversion-result").textContent = "";
    document.getElementById("assessment").textContent = "";
    document.getElementById("formula").textContent = "Formula: (F - 32) × 5/9 = C";
}

// Magic 8 Ball Functions
const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

let historyItems = [];

function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const ball = document.getElementById('ball');
    const answerElement = document.getElementById('answer');
    const questionDisplay = document.getElementById('question-display');
    const questionInput = document.getElementById('question');
    
    if (question === '') {
        alert('Please ask a question first!');
        return;
    }

    answerElement.textContent = '8';
    
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    setTimeout(() => {
        const randomAnswer = getRandomAnswer();
        answerElement.textContent = randomAnswer;
        questionDisplay.textContent = `"${question}"`;
        questionDisplay.style.opacity = 1;
        addToHistory(question);
    }, 500);
    
    questionInput.value = '';
}

function resetBall() {
    document.getElementById('answer').textContent = '8';
    document.getElementById('question-display').textContent = '';
    document.getElementById('question-display').style.opacity = 0;
    document.getElementById('question').value = '';
}

function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const questionHistory = document.getElementById('question-history');
    questionHistory.innerHTML = '';
    
    historyItems.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        listItem.textContent = question;
        questionHistory.appendChild(listItem);
    });
}

function clearHistory() {
    historyItems = [];
    updateHistoryDisplay();
}

// Wellness Task Tracker with Due Dates (Project 2)

// 2D Array to store tasks - each task is [taskText, priority]
let tasks = [];
// New 2D array to store date and time - each item is [dateString, timeString]
let taskDueDates = [];

// Array of random tasks for the random task feature - focused on health and student wellness
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Function to validate date in MM/DD format
// TODO
/* 1. Create a function that validates the date string in MM/DD format
   2. Check if the string has exactly one '/' character
   3. Split the string by '/' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if month is between 1-12
   7. Check if day is valid for the given month (use an array for days in each month)
   8. Return true if date is valid, false otherwise
*/
function validateDate(dateStr) {
    if (dateStr.split('/').length !== 2) return false;
    const [monthStr, dayStr] = dateStr.split('/');
    if (monthStr.length !== 2 || dayStr.length !== 2) return false;
  
    for (let char of monthStr + dayStr) {
      if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) return false;
    }
  
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    if (month < 1 || month > 12) return false;
  
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) return false;
  
    return true;
  }
  
function validateTime(timeStr) {
    if (timeStr.split(':').length !== 2) return false;
    const [hourStr, minuteStr] = timeStr.split(':');
    if (hourStr.length !== 2 || minuteStr.length !== 2) return false;
  
    for (let char of hourStr + minuteStr) {
      if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) return false;
    }
  
    const hours = parseInt(hourStr);
    const minutes = parseInt(minuteStr);
    if (hours < 0 || hours > 23) return false;
    if (minutes < 0 || minutes > 59) return false;
  
    return true;
  }

function calculatePriority(dateStr, timeStr) {
    const year = new Date().getFullYear();
  
    const [monthStr, dayStr] = dateStr.split('/');
    const [hourStr, minuteStr] = timeStr.split(':');
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);
    const hours = parseInt(hourStr);
    const minutes = parseInt(minuteStr);
  
    const dueDate = new Date(year, month - 1, day, hours, minutes);
  
    return dueDate.getTime();
  }



// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  if (!validateDate(dateStr)) {
    alert('Please enter a valid date in MM/DD format!');
    return;
  }
  
  if (!validateTime(timeStr)) {
    alert('Please enter a valid time in 24-hour format (HH:MM)!');
    return;
  }
  
  // Calculate priority based on date and time
  const priority = calculatePriority(dateStr, timeStr);
  console.log(priority);
  
  // Create task array [taskText, priority]
  const task = [taskText, priority];
  
  // Add to tasks array
  tasks.push(task);
  
  // Add to due dates array
  taskDueDates.push([dateStr, timeStr]);
  
  // Sort tasks by priority
  sortTasksByPriority();
  
  // Update task display
  updateTaskDisplay();
  
  // Clear the input field
  clearInput();
}

// Function to add a random task
function addRandomTask() {
  // Get random task from the array
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  const randomTask = randomTasks[randomIndex];
  
  // Set the task input value
  taskInput.value = randomTask;
  
  // Focus on the date input
  dateInput.focus();
}

// Function to sort tasks by priority and update the taskDueDates array accordingly
function sortTasksByPriority() {
  // Create an array of indices
  let indices = Array.from(Array(tasks.length).keys());
  
  // Sort indices based on due dates and times
  indices.sort(function(a, b) {
    // Get date and time from taskDueDates
    const dateA = taskDueDates[a][0];
    const timeA = taskDueDates[a][1];
    const dateB = taskDueDates[b][0];
    const timeB = taskDueDates[b][1];
    
    // Parse date components
    const [monthA, dayA] = dateA.split('/').map(Number);
    const [monthB, dayB] = dateB.split('/').map(Number);
    
    // Compare months first
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    
    // If months are the same, compare days
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    // If dates are the same, compare times
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    
    // Compare hours
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    
    // Compare minutes
    return minutesA - minutesB;
  });
  
  // Create new arrays based on sorted indices
  const newTasks = [];
  const newTaskDueDates = [];
  
  for (let i = 0; i < indices.length; i++) {
    newTasks.push(tasks[indices[i]]);
    newTaskDueDates.push(taskDueDates[indices[i]]);
  }
  
  // Replace original arrays with sorted arrays
  tasks = newTasks;
  taskDueDates = newTaskDueDates;
}

// Function to handle keypress (for Enter key)
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// Assign the onkeydown property directly
taskInput.onkeydown = handleKeyPress;

// Function to clear the input fields
function clearInput() {
  taskInput.value = '';

  taskInput.focus();
}

// Function to update the task display
function updateTaskDisplay() {
  // Clear current task list
  taskList.innerHTML = '';
  
  // Add each task item using for loop as requested
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task[0]; // Task text is at index 0
    const dateStr = taskDueDates[i][0]; // Date string
    const timeStr = taskDueDates[i][1]; // Time string
    
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    // Create task details container
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Parse the date and time
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create a date object for the due date
    const dueDate = new Date(currentYear, month - 1, day, hours, minutes);
    
    // Calculate time difference in hours
    const diffMs = dueDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Assign visible priority class based on time difference
    let priorityClass = 1; // Default to highest priority (red)
    if (diffHours < 0) {
      priorityClass = 1; // Overdue - highest priority (red)
    } else if (diffHours < 4) {
      priorityClass = 1; // Due within 4 hours - highest priority (red)
    } else if (diffHours < 24) {
      priorityClass = 2; // Due within a day (orange)
    } else if (diffHours < 48) {
      priorityClass = 3; // Due within 2 days (blue)
    } else if (diffHours < 72) {
      priorityClass = 4; // Due within 3 days (green)
    } else {
      priorityClass = 5; // Due later - lowest priority (gray)
    }
    
    // Create task text container
    const taskTextContainer = document.createElement('span');
    taskTextContainer.className = 'task-text';
    
    // Create priority dot element
    const priorityDot = document.createElement('span');
    priorityDot.className = `priority-indicator priority-${priorityClass}`;
    
    // Create the actual task text element
    const taskTextElement = document.createTextNode(taskText);
    
    // Create due date text
    const dueDateText = document.createElement('span');
    dueDateText.className = 'due-date-text';
    dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
    
    // Create delete button with onclick attribute
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    // Append elements to containers
    taskTextContainer.appendChild(priorityDot);
    taskTextContainer.appendChild(taskTextElement);
    
    taskDetails.appendChild(taskTextContainer);
    taskDetails.appendChild(dueDateText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    // Append list item to task list
    taskList.appendChild(listItem);
  }
}

// Function to delete a specific task
function deleteTask(index) {
  // Remove task from both arrays
  tasks.splice(index, 1);
  taskDueDates.splice(index, 1);
  
  // Update the display
  updateTaskDisplay();
}

// Function to clear all tasks
function clearTasks() {
  // Clear both arrays
  tasks = [];
  taskDueDates = [];
  
  // Update the display
  updateTaskDisplay();
}

// Initial input field setup and display update
window.onload = function() {
  // Initial update of task display
  updateTaskDisplay();
};

// Countdown Timer Functions
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

window.addEventListener('load', function() {
    timerDisplay = document.getElementById('timer');
    motivationDisplay = document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startCountdown() {
    const seconds = parseInt(secondsInput.value);

    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    timeLeft = seconds;
    updateTimerDisplay();
    
    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft % 5 === 0 || timeLeft === seconds - 1) {
            phraseIndex = (phraseIndex + 1) % motivationalPhrases.length;
            motivationDisplay.textContent = motivationalPhrases[phraseIndex];
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            motivationDisplay.textContent = "🎉 Congratulations! You've completed the countdown!";
            startBtn.disabled = false;
            secondsInput.disabled = false;
            statusDisplay.textContent = "Countdown complete!";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}

// NATO Converter Functions
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                    "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                    "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                    "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                    "Seven", "Eight", "Nine", "Zero"];

function chToNato(ch) {
    const upperCh = ch.toUpperCase();
    const index = natoLetters.indexOf(upperCh);
    if (index !== -1) {
        return natoWords[index];
    }
    return ch;
}

function wordToNato(word) {
    const characters = word.split("");
    const natoCharacters = characters.map(ch => chToNato(ch));
    return natoCharacters.join(" ");
}

function sentenceToNato(sentence) {
    const words = sentence.split(" ");
    const natoWords = words.map(word => wordToNato(word));
    return natoWords.join(" ");
}

function verbalize() {
    const inputString = document.getElementById("inputString").value;
    const natoResult = sentenceToNato(inputString);
    document.getElementById("natoResult").textContent = natoResult;
}

function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}

// Calculator Functions (Project 3) 

// Global Variables
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

// DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Initialize display
display.value = "0";

// Functions for calculator operations
function appendToDisplay(value) {
    // If we just completed a calculation and start typing a new number
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }
    
    // If waiting for right operand, start a new input
    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        // Handle leading zero
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
    
    currentInput = display.value;
}

function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value = memory;
    currentInput = display.value;
}

function addToMemory() {
    try {
        // TODO: Replace this with safer code
        memory += parseFloat(evaluateExpression(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function subtractFromMemory() {
    try {
        // TODO: Replace this with safer code
        memory += parseFloat(evaluateExpression(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

/* Implement a function that parses and calculates mathematical expressions
   1. Create a function named evaluateExpression that takes an expression string as input
   2. First, handle simple number case: if the expression is a number, return it as a float
   3. Create an array to store tokens (numbers and operators)
   4. Loop through each character in the expression
   5. If the character is an operator (+, -, *, /), add the current number to tokens and then add the operator
   6. If the character is a digit or decimal point, add it to the current number string
   7. After the loop, add any remaining number to tokens
   8. Process multiplication and division first (following order of operations)
   9. Then process addition and subtraction
   10. Return the final calculated result
*/
function evaluateExpression(expression) {
     // If it's a simple number, return it
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
        return parseFloat(expression);
    }
    
    // Create a tokenizer to parse the expression
    const tokens = [];
    let currentNumber = '';
    
    // Tokenize the expression
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            if (currentNumber) {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        } else if (!isNaN(parseInt(char)) || char === '.') {
            currentNumber += char;
        }
    }
    
    // Push the last number if exists
    if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
    }
    
    // Process multiplication and division first
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*') {
            tokens[i-1] = tokens[i-1] * tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        } else if (tokens[i] === '/') {
            tokens[i-1] = tokens[i-1] / tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        }
    }
    
    // Process addition and subtraction
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result += tokens[i+1];
        } else if (tokens[i] === '-') {
            result -= tokens[i+1];
        }
    }
    
    return result;
}

// TODO: Write the body of this function
/* This function should handle various mathematical operations like sqrt, power, etc.
   1. Handle the 'Math.sqrt' function:
      a. Update history.textContent to show the operation
      b. Calculate the square root of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   2. Handle the 'Math.pow' function:
      a. Store the current display value as leftOperand
      b. Update history.textContent to show the base
      c. Set currentOperator to "pow"
      d. Set waitingForRightOperand to true to wait for the exponent
   
   3. Handle 'Math.abs' function:
      a. Update history.textContent to show the operation
      b. Calculate the absolute value of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   4. Handle trigonometric functions (Math.sin, Math.cos, Math.tan):
      a. Extract the function name (sin, cos, tan)
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
   
   5. Handle inverse trigonometric functions (Math.asin, Math.acos, Math.atan)
      a. Extract the function name (asin, acos, atan)
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
   
   6. Handle 'Math.log' function (base 10 logarithm):
      a. Update history.textContent to show the operation
      b. Calculate the logarithm of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   7. Handle 'Math.exp' function (e^x):
      a. Update history.textContent to show the operation
      b. Calculate e raised to the power of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   8. Handle rounding functions (Math.round, Math.ceil, Math.floor):
      a. Extract the function name
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
*/
function insertMathFunction(func) {
    const input = parseFloat(display.value);
    if (isNaN(input)) {
        display.value = "Error";
        return;
    }

    switch (func) {
        case 'sqrt':
            history.textContent = `√(${input})`;
            display.value = Math.sqrt(input);
            break;
        case 'pow':
            leftOperand = input;
            history.textContent = `${input}^`;
            currentOperator = "pow";
            waitingForRightOperand = true;
            return;
        case 'abs':
            history.textContent = `abs(${input})`;
            display.value = Math.abs(input);
            break;
        case 'sin':
            history.textContent = `sin(${input})`;
            display.value = Math.sin(input);
            break;
        case 'cos':
            history.textContent = `cos(${input})`;
            display.value = Math.cos(input);
            break;
        case 'tan':
            history.textContent = `tan(${input})`;
            display.value = Math.tan(input);
            break;
        case 'asin':
            history.textContent = `asin(${input})`;
            display.value = Math.asin(input);
            break;
        case 'acos':
            history.textContent = `acos(${input})`;
            display.value = Math.acos(input);
            break;
        case 'atan':
            history.textContent = `atan(${input})`;
            display.value = Math.atan(input);
            break;
        case 'log':
            history.textContent = `log(${input})`;
            display.value = Math.log10(input);
            break;
        case 'exp':
            history.textContent = `exp(${input})`;
            display.value = Math.exp(input);
            break;
        case 'round':
            history.textContent = `round(${input})`;
            display.value = Math.round(input);
            break;
        case 'ceil':
            history.textContent = `ceil(${input})`;
            display.value = Math.ceil(input);
            break;
        case 'floor':
            history.textContent = `floor(${input})`;
            display.value = Math.floor(input);
            break;
        default:
            display.value = "Error";
            return;
    }

    currentInput = display.value;
    calculationDone = true;
}


// TODO: Write the body of this function
/* This function should insert mathematical constants into the calculator display
   1. Check if constant is 'Math.PI' and if so, set display.value to Math.PI
   2. Check if constant is 'Math.E' and if so, set display.value to Math.E
   3. Check if constant is 'Math.LN2' and if so, set display.value to Math.LN2
   4. Check if constant is 'Math.LN10' and if so, set display.value to Math.LN10
   5. Update currentInput to match the display value
   6. Set calculationDone to true
*/
function insertMathConstant(constant) {
    let value;

    switch (constant) {
        case 'Math.PI':
            value = Math.PI;
            break;
        case 'Math.E':
            value = Math.E;
            break;
        case 'Math.LN2':
            value = Math.LN2;
            break;
        case 'Math.LN10':
            value = Math.LN10;
            break;
        default:
            display.value = "Error";
            return;
    }

    display.value = value;
    currentInput = display.value;
    calculationDone = true;
}

/* This function should calculate the result of the current expression
   1. Check if we're in the middle of a power operation:
      a. If currentOperator is "pow" and leftOperand is not null:
         i. Calculate base^exponent using Math.pow
         ii. Update history.textContent to show the full operation
         iii. Update display.value with the result
         iv. Reset leftOperand and currentOperator
   2. Otherwise:
      a. Update history.textContent with the current expression
      b. Calculate the result using evaluateExpression
      c. Update display.value with the result
   3. Set calculationDone to true
*/
function calculate() {
   try {
        if (currentOperator === "pow" && leftOperand !== null) {
            // Handle power operation
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            // Handle normal operations
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}

// Contacts App Functions
let contactsData = {
    "contacts": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "555-123-4567",
            "type": "personal"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@company.com",
            "phone": "555-987-6543",
            "type": "work"
        },
        {
            "id": 3,
            "name": "Bob Johnson",
            "email": "bob@family.net",
            "phone": "555-555-5555",
            "type": "family"
        }
    ]
};

function displayContacts(contacts = contactsData.contacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts found.</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.className = 'contact-card';
        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            <p>Type: ${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</p>
        `;
        contactsList.appendChild(div);
    });
}

function updateJSONDisplay() {
    const jsonContent = document.getElementById('json-content');
    jsonContent.textContent = JSON.stringify(contactsData, null, 4);
}

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (!searchTerm) {
        displayContacts();
        return;
    }
    
    const filteredContacts = contactsData.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm) ||
                contact.type.toLowerCase().includes(searchTerm);
    });
    
    displayContacts(filteredContacts);
}

function addContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    
    let newId;
    if (contactsData.contacts.length > 0) {
        const maxId = Math.max(...contactsData.contacts.map(function(c) { 
            return c.id; 
        }));
        newId = maxId + 1;
    } else {
        newId = 1;
    }
    
    const newContact = {
        id: newId,
        name,
        email,
        phone,
        type
    };
    
    contactsData.contacts.push(newContact);
    document.getElementById('contact-form').reset();
    displayContacts();
    updateJSONDisplay();
    alert('Contact added successfully!');
    switchTab('view');
    
    return false;
}

function resetSearch() {
    document.getElementById('search-input').value = '';
    displayContacts();
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabId)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabId}-contacts` || content.id === `${tabId}-contact` || content.id === `${tabId}-view`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    if (tabId === 'json') {
        updateJSONDisplay();
    }
}

// Initialize contacts on load
window.addEventListener('load', function() {
    displayContacts();
    updateJSONDisplay();
});