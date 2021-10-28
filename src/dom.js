const DOMTasks = () => {
    const tasks = document.querySelector('.tasks');
    const properties = ['title', 'projectName', 'description', 'dueDate', 'priority', 'complete', 'hashtags'];

    function createTaskElement(task, tasklist) {
        // create element for new task
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');

        // create property elements for each task
        properties.forEach(property => {
            const propertyElement = createPropertyElement('div', undefined, property, 'task-property', task);
            taskElement.appendChild(propertyElement);
        });

        // create button to remove task
        const removeTask = document.createElement('button');
        removeTask.classList.add('remove-task');        
        removeTask.addEventListener('click', () => {
            tasklist.removeTask(task);
            displayTasks(tasklist);
        });

        taskElement.appendChild(removeTask);

        return taskElement;
    }

    function createPropertyElement(element, type, property, className, task) {
        const propertyElement = document.createElement(element);
        propertyElement.type = type;
        propertyElement.name = property;
        propertyElement.classList.add(className);
        propertyElement.placeholder = property;

        if (task) {
            propertyElement.innerHTML = task[property];
        }

        return propertyElement;
    }

    function clearTaskDisplay() {
        tasks.innerHTML = '';
    }

    function displayTasks(tasklist) {
        clearTaskDisplay();
        tasklist.tasklist.forEach(task => {
            const taskElement = createTaskElement(task, tasklist);
            tasks.prepend(taskElement);
        });
        console.log(tasklist.tasklist);
    }
    
    return {
        createTaskElement,
        clearTaskDisplay,
        createPropertyElement,
        displayTasks
    };
}


export { DOMTasks };