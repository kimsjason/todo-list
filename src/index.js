import { TaskForm } from './task-form';
import './main.css';

// instantiate new task form
const taskform = TaskForm();
const content = document.querySelector('.content');
content.appendChild(taskform.taskForm);




