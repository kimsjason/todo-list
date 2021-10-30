import { DOMTasks } from './dom';
import { Tasklist } from './tasks';
import { Events } from './events';
import './main.css';

// instantiate new task form
const tasklist = Tasklist();
const events = Events();
const dom = DOMTasks(tasklist, events);

// create task form
const taskform = dom.createTaskForm();
const content = document.querySelector('.content');
content.appendChild(taskform);

// initialize example tasks
tasklist.createExampleTasks();
dom.displayTasks();




