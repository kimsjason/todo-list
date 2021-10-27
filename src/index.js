import { taskForm } from './task-form';
import { todo, todoItem } from './todo';
import { domItem } from './dom';

const main = todo();

// example task
const item = todoItem(
    'Walk dog', 
    'Daily Chores', 
    'Walk ziggy before going to work', 
    '10/27/2021', 
    'medium',
    'incomplete',
    '#chores'
    );

main.addItem(item)
const domElement = domItem(item);

const content = document.querySelector('.content');
const form = taskForm();
content.appendChild(form);
content.appendChild(domElement);

//console.log(main.list)
