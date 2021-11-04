import { format } from 'date-fns';

const DOMTasks = () => {
    const content = document.querySelector('.content');
    const taskContent = document.querySelector('.task-content');
    const properties = ['title', 'projectName', 'description', 'dueDate', 'priority', 'complete', 'hashtags'];
    const sidebar = document.querySelector('.sidebar');
    const dropdown = document.querySelector('.dropdown');

    displayTaskForm(createTaskForm())

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

    function updateDropdown(projects) {
        hideElement(dropdown);
        //dropdown.classList.toggle('hidden');
        dropdown.innerHTML = '';
        Object.keys(projects).forEach(project => {
            const dropdownItems = createDiv('dropdown-items', project);
            dropdown.appendChild(dropdownItems);
        });

        sidebar.appendChild(dropdown);
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

    function displayTaskForm(taskform) {
        content.appendChild(taskform);
    }

    function createTaskProperties(task) {
        const taskProperties = [];
        
        const mainProperties = document.createElement('div');
        const detailProperties = document.createElement('div');
        mainProperties.classList.add('main-properties');
        detailProperties.classList.add('detail-properties');
        
        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            if (property == 'title') {
                propertyElement.innerHTML = task[property];
                mainProperties.appendChild(propertyElement);
            } else if (property == 'dueDate') {
                propertyElement.innerHTML = format(task[property], 'MM/dd/yyyy');
                mainProperties.appendChild(propertyElement);
            } else {
                propertyElement.innerHTML = task[property];
                detailProperties.appendChild(propertyElement);
            }

            taskProperties.push(mainProperties);
            taskProperties.push(detailProperties);
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

        // store object reference in html task element
        taskElement.taskObject = task;

        return taskElement;
    }
    
    function createTasks(tasklist) {
        const tasks = document.createElement('div');
        tasks.classList.add('tasks');
        
        tasklist.forEach(task => {
            const taskElement = createTaskElement(task);
            taskElement.taskObject = task;
            tasks.appendChild(taskElement);
        });

        return tasks;
    }

    function clearTaskDisplay() {
        taskContent.innerHTML = '';
    }

    function displayTasks(tasks) {
        taskContent.prepend(tasks);
    }

    function showView(tasklist) {
        const tasks = createTasks(tasklist);
        clearTaskDisplay();
        displayTasks(tasks);
    }
    
    function hideElement(element) {
        element.classList.toggle('hidden');
        return element;
    }

    return {
        createDiv,
        createInput,
        updateDropdown,
        createFormProperties,
        createTaskForm,
        displayTaskForm,
        createTaskProperties,
        createTaskElement,
        createTasks,
        clearTaskDisplay,
        displayTasks,
        showView,
        hideElement
    
    };
}


export { DOMTasks };