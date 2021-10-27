import { domItem } from "./dom";
import { todoItem } from "./todo";

const taskForm = () => {
    // list item element
    const task = document.createElement('div');
    task.classList.add('task-form');
    task.innerHTML = 'New Task';

    // list item property elements
    const title = document.createElement('input');
    const projectName = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('input');
    const status = document.createElement('input');
    const hashtags = document.createElement('input');

    title.type = 'text';
    projectName.type = 'text';
    description.type = 'text';
    dueDate.type = 'text';
    priority.type = 'text';
    status.type = 'text';
    hashtags.type = 'text';

    title.placeholder = 'title';
    projectName.placeholder = 'project name';
    description.placeholder = 'description';
    dueDate.placeholder = 'due date';
    priority.placeholder = 'priority';
    status.placeholder = 'status';
    hashtags.placeholder = '#hashtag';

    title.classList.add('title');
    projectName.classList.add('project-name');
    description.classList.add('description');
    dueDate.classList.add('due-date');
    priority.classList.add('priority');
    status.classList.add('status');
    hashtags.classList.add('hashtags');

    task.appendChild(title);
    task.appendChild(projectName);
    task.appendChild(description);
    task.appendChild(dueDate);
    task.appendChild(priority);
    task.appendChild(status);
    task.appendChild(hashtags);

    // add new task button
    const addTask = document.createElement('input');
    addTask.type = 'button';
    addTask.value = 'Add Task';
    task.appendChild(addTask);

    // add task event listener
    addTask.addEventListener('click', () => {
        const item = todoItem(
            title.value,
            projectName.value,
            description.value,
            dueDate.value,
            priority.value,
            status.value,
            hashtags.value
        );
    
        const content = document.querySelector('.content');
        const newTask = domItem(item);
        content.appendChild(newTask);
    });

    return task;
}

export { taskForm };