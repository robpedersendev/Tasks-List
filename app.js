// Define UI variables
//this varible is for the form
const form = document.querySelector('#task-form');
//This variable selects the UL element in the form where the tasks will populate once entered
const taskList = document.querySelector('.collection');
//This is for the button on the page that clears the tasks from local memory of the browser
const clearBtn = document.querySelector('.clear-tasks');
//this variable is assigned to the filter aspect of the form when lis exist inside of hte ul element
const filter = document.querySelector('#filter');
//This is the variable that is assigned to the input section of the form
const taskInput = document.querySelector('#task');

//Load all event listeners
//This calls the function loadEventListeners
loadEventListeners();

//Load all event listeners
//This is the funtion for loadEventListeners
function loadEventListeners () {
  //DOM load event
  //This line of code uses the event listener DOMContentLoaded, which means it is loaded at the loading of the page and calls the function getTasks once it is loaded
  document.addEventListener('DOMContentLoaded', getTasks);

  //Add Task event
  //When the button "ADD TASK" is clicked the event in the function is activated which is tied to the id of 'submit' that is located in the HTML page. The addTask function is the second parameter and is written out below
  form.addEventListener('submit', addTask);

  //Remove task Event
  //The below code is saying when ever a click occurs within the html 'ul' element run the function 'removeTask'
  taskList.addEventListener('click', removeTask);

  //Clear task event
  //The code below is saying that when ever the HTML element 'button' with the class of '.clear-tasks' is clicked, run the function 'clearTasks'
  clearBtn.addEventListener('click', clearTasks);

  //Filter tasks event
  //The code below is saying when ever a ' key up' action (releasing a dpressed key) occurs within the filter tasks area to then run the function 'filterTasks'
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LocalStorage
function getTasks() {
  //Create a variable called "tasks" on a block scope
  let tasks;
  //The line of code below is saying if the tasks in local Storage equal Null
  if(localStorage.getItem('tasks') === null) {
    //Then set the variable tasks to equal an empty array
    tasks = [];
    //Other wise, do this
  } else {
    //Assigns the variable 'tasks' to a JOSN object that gets each task stored in local storage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create li element called "li"
  const li = document.createElement('li');

  //Take the element previosuly created, the "li", and add a class to it called "collection-item".
  li.className = 'collection-item';

  //Create text node and append to li
  //Take the li and use the appendChild method and within the methods paranthesis call the method "createTextNode" on the document variable (that comes as default in all HTML pages) and within that methods paranthesis use the taskInput variable with the ".value" attribute which means the characters that are entered into the input area.

  //What this means is whatever text is entered in the input area a text node is created and then appended to the newly created HTML element "li"

  li.appendChild(document.createTextNode(task));

  // Create new link element
  // This link element will be the link of the red 'X' next to each task to remove it from the ul element and ultimately delete that li element
  const link = document.createElement('a');

  //Add Class
  //This class will be added to the link element created above
  //There will be two classes created, "delete-item" and "secondary-content". To use multiple CSS classes in javaScript you just use a space between each one
  link.className = 'delete-item secondary-content';

  //Add icon html
  //Add the HMTL verbage for an 'i' tag that has two classes, "fa", and "fa-remove"
  //Wrap the html in quotes
  //Type the HTML as you normally would
  //Append this to the link variable, which is actually a newly created HTML "a" tag
  link.innerHTML = '<i class=" fa fa-remove"></i>';

  //Append link to li
  //Take the variable "link" that is the "a" tag created above that now has the added classes and the "i" HTML tag and append the entire "a" tag to the li variable
  //that was created earlier and assigned to create an HTML element of "li"
  li.appendChild(link);

  //Append li to ul
  //This takes the complete "li" structure that was previously created and appends it to the HTML element that has a class of ".collection", which in this case
  // is the HTML element "ul"

  //This is telling the browser to place the "li" within the "ul" when there is an entry from a user
  taskList.appendChild(li);
  });
}


//This is the addTask function referenced above
//The "e" in the paranthesis of the function is merely a placeholder that will be used later
function addTask(e) {
  //This function is long running and includes multiple variables and other items

  //If the input from the user is empty an alert box will be displayed with the content 'Add a task'.
  if(taskInput.value === '') {
    alert('Add a task');
  };

  //Create li element called "li"
  const li = document.createElement('li');

  //Take the element previosuly created, the "li", and add a class to it called "collection-item".
  li.className = 'collection-item';

  //Create text node and append to li
  //Take the li and use the appendChild method and within the methods paranthesis call the method "createTextNode" on the document variable (that comes as default in all HTML pages) and within that methods paranthesis use the taskInput variable with the ".value" attribute which means the characters that are entered into the input area.

  //What this means is whatever text is entered in the input area a text node is created and then appended to the newly created HTML element "li"

  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  // This link element will be the link of the red 'X' next to each task to remove it from the ul element and ultimately delete that li element
  const link = document.createElement('a');

  //Add Class
  //This class will be added to the link element created above
  //There will be two classes created, "delete-item" and "secondary-content". To use multiple CSS classes in javaScript you just use a space between each one
  link.className = 'delete-item secondary-content';

  //Add icon html
  //Add the HMTL verbage for an 'i' tag that has two classes, "fa", and "fa-remove"
  //Wrap the html in quotes
  //Type the HTML as you normally would
  //Append this to the link variable, which is actually a newly created HTML "a" tag
  link.innerHTML = '<i class=" fa fa-remove"></i>';

  //Append link to li
  //Take the variable "link" that is the "a" tag created above that now has the added classes and the "i" HTML tag and append the entire "a" tag to the li variable
  //that was created earlier and assigned to create an HTML element of "li"
  li.appendChild(link);

  //Append li to ul
  //This takes the complete "li" structure that was previously created and appends it to the HTML element that has a class of ".collection", which in this case
  // is the HTML element "ul"

  //This is telling the browser to place the "li" within the "ul" when there is an entry from a user
  taskList.appendChild(li);

  //Store data in the LS
  //Persist the data in the browsers cache
  storeTaskInLocalStorage(taskInput.value);

  //Clear Input
  //This sets the value of the input area to be blank after all of the function above occurrs
  taskInput.value = '';

  //This changes the default behavior of the form from refreshing to do nothing instead.
  e.preventDefault();
};

//Store Task in local storage
function storeTaskInLocalStorage(task) {
  //Create a variable called "tasks" on a block scope
  let tasks;
  //The line of code below is saying if the tasks in local Storage equal Null
  if(localStorage.getItem('tasks') === null) {
    //Then set the variable tasks to equal an empty array
    tasks = [];
    //Other wise, do this
  } else {
    //Assigns the variable 'tasks' to a JOSN object that gets each task stored in local storage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //This line of code pushes the task on to the end of the JSON object 'tasks' variable
  tasks.push(task);
  //This sets each item in the local storage JOSN object to a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  //The line below is saying "If the HTML parent element of the target that is clicked contains the class of 'delete-item' 
  if(e.target.parentElement.classList.contains('delete-item')){
    //AND the ok button on the prompt shown to user is clicked
    if(confirm('Are You Sure?')) {
      //Then delete the parent element of the parent element of the item that was clicked".
      e.target.parentElement.parentElement.remove();
      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  //Ultimately deleting everything associated with the target that was clicked which in htis case is the red 'x'
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  //Create a variable called "tasks" on a block scope
  let tasks;
  //The line of code below is saying if the tasks in local Storage equal Null
  if(localStorage.getItem('tasks') === null) {
    //Then set the variable tasks to equal an empty array
    tasks = [];
    //Other wise, do this
  } else {
    //Assigns the variable 'tasks' to a JOSN object that gets each task stored in local storage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //For each task in the tasks JSON object run a function that takes in each task one at a time and the index of each task
  tasks.forEach(function(task, index){
    //If the text content of the taskItem (an argument defined above) is the exact same as a task
    if(taskItem.textContent === task){
      //Then splice the task from the array
      tasks.splice(index, 1);
    }
  });

  //Set the JSON object of 'tasks' located in the local storage to a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Clear Tasks
function clearTasks (){
  //This process is much slower compared to a while loop
  //This method clears out all HTML within a specified HTML tag, leaving the tag intact
  // taskList.innerHTML = '':

  //This method is much faster than the innerHTML method
  //This loop checks to see if there are any child elements within the 'ul' HTML element and every time there is something within the 'ul', the loop runs
  while(taskList.firstChild) {
    //This line of code takes the first child of the 'ul' element and removes it
    taskList.removeChild(taskList.firstChild)
  }

  //This url address shows the speed difference between the while loop and the 'innerHTML' method
  //https://jsperf.com/innerhtml-vs-removechild

  //Clear Tasks from LS
  clearTasksFromLocalStorage();


}

//Clear tasks from LS
function clearTasksFromLocalStorage() {
  //Clears all tasks from the local storage of the broswer
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  //Create a variable that assigns the value of the target of e to equal lowerCase
  const text = e.target.value.toLowerCase();

  //Can use for each since this retuns a node list
  //The line below finds all HTML elements that have the class ".collection-item" and creates a loop using the ".forEach" method and creates a function that takes in task as its iterator
  document.querySelectorAll('.collection-item').forEach( function(task){
    //Create a variable that is assigned to the text content of the first child of each "li" item
    const item = task.firstChild.textConect;
    //This line of code compares the numerical value of the existing tasks to see what it equals. If it equals '-1' then this function will not occur. If it equals something different from '-1' then it will occur.
    //This sets each letter typed into the filter area to lowercase
    if(item.toLowerCase().indexOf(text) != -1)  {
      //This line of code sets the display style of the task variable to "block"
      task.stlye.display = 'block';
    } else {
      //This line of code sets the display style of the task variable to "none" which temporarily sets the display to none
      task.style.display = 'none';
    }
  });
}