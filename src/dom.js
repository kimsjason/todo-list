const DOMTasks = (tasklist) => {
    const tasks = document.querySelector('.tasks');
    const content = document.querySelector('.content');
    const properties = ['title', 'projectName', 'description', 'dueDate', 'priority', 'complete', 'hashtags'];

    function createDiv(classList, innerHTML) {
        const div = document.createElement('div');
        div.classList.add(classList);
        div.innerHTML = innerHTML;

        return div;
    }

    function createInput(type, classList, value) {
        const input = document.createElement('input');
        input.type = type;
        input.classList.add(classList);
        input.value = value;

        return input;
    }

    function createFormProperties() {
        const formProperties = [];
        
        properties.forEach(property => {
            const propertyElement = document.createElement('input');

            propertyElement.type = 'text';
            propertyElement.name = property;
            propertyElement.classList.add('task-form-property');
            propertyElement.placeholder = property;
            
            formProperties.push(propertyElement);
        });

        return formProperties;
    }

    function createTaskForm() {
        // task form
        const taskForm = createDiv('task-form', 'New Task');

        // task form properties
        const formProperties = createFormProperties();
        formProperties.forEach(property => {
            taskForm.appendChild(property);
        });

        // add new task button
        const addTaskButton = createInput('button', 'add-task', 'Add Task');
        taskForm.appendChild(addTaskButton);
        content.appendChild(taskForm);

        return taskForm;
    }

    function createTaskProperties(task) {
        const taskProperties = [];
        
        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('task-property');
            propertyElement.innerHTML = task[property];
            
            taskProperties.push(propertyElement);
        });

        return taskProperties;
    }

    function createTaskElement(task) {
        // create element for new task
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');

        // create property elements for each task
        const taskProperties = createTaskProperties(task);
        taskProperties.forEach(property => {
            taskElement.appendChild(property);
        });

        // create button to remove task
        const removeTaskButton = createInput('button', 'remove-task', 'Remove Task');
        taskElement.appendChild(removeTaskButton);

        return taskElement;
    }

    function clearTaskDisplay() {
        tasks.innerHTML = '';
    }

    function displayTasks(tasklist) {
        clearTaskDisplay();
        tasklist.forEach(task => {
            const taskElement = createTaskElement(task);
            taskElement.taskObject = task;
            tasks.prepend(taskElement);
        });
    }
    
    return {
        createDiv,
        createInput,
        createFormProperties,
        createTaskForm,
        createTaskProperties,
        createTaskElement,
        clearTaskDisplay,
        displayTasks
    };
}


export { DOMTasks };