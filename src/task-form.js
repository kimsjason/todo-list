import { DOMTasks } from "./dom";
import { Task } from "./tasks";
import { Tasklist } from "./tasks";
import { Events } from "./events";

const TaskForm = () => {
    // instantiate task list
    const tasklist = Tasklist();
    const dom = DOMTasks();
    const events = Events();

    // example task
    const example = Task('Walk dog', 'Daily Chores', 'Walk ziggy before going to work', '10/27/2021', 'medium','incomplete','#chores');
    tasklist.addTask(example)

    // create element for new task form
    const taskForm = document.createElement('div');
    taskForm.classList.add('task-form');
    taskForm.innerHTML = 'New Task';

    // create property elements for task form
    const properties = ['title', 'projectName', 'description', 'dueDate', 'priority', 'complete', 'hashtags'];
    properties.forEach(property => {
        const propertyElement = dom.createPropertyElement('input', 'text', property, 'task-form-property', undefined);
        taskForm.appendChild(propertyElement);
    });

    // add new task submit button
    const addTaskButton = document.createElement('input');
    addTaskButton.type = 'button';
    addTaskButton.value = 'Add Task';
    taskForm.appendChild(addTaskButton);

    // add task event listener
    events.addTaskEvent(addTaskButton, tasklist, taskForm);
    dom.displayTasks(tasklist);

    return {
        tasklist,
        taskForm
    };
}

export { TaskForm };