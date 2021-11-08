import { add, format } from 'date-fns';
import { Task } from './tasks';

const DOMTasks = () => {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const taskContent = document.querySelector('.task-content');

    const properties = ['title', 'description', 'dueDate', 'project', 'priority'];
    
    displayTaskForm(createTaskForm())

    function createDropdown(projects) {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('hidden');
        dropdown.innerHTML = '';
        Object.keys(projects).forEach(project => {
            const dropdownItems = document.createElement('div');
            dropdownItems.classList.add('dropdown-items');
            dropdownItems.innerHTML = project;
            dropdown.appendChild(dropdownItems);
        });

        return dropdown;
    }

    function displayDropdown(dropdown) {
        sidebar.appendChild(dropdown);
    }

    function createFormProperties() {
        const formProperties = [];
        
        properties.forEach(property => {
            const propertyContainer = document.createElement('div');
            const propertyName = document.createElement('div');
            const propertyElement = document.createElement('input');

            propertyContainer.classList.add('property-container', property);
            propertyName.classList.add('property-name');
            propertyElement.classList.add('task-form-property');

            propertyName.innerHTML = property;
            propertyElement.type = 'text';
            propertyElement.name = property;

            propertyContainer.appendChild(propertyName);
            propertyContainer.appendChild(propertyElement);

            formProperties.push(propertyContainer);
        });

        return formProperties;
    }

    function createTaskForm() {
        // task form
        const taskForm = document.createElement('div');
        taskForm.classList.add('task-form');

        // task form header
        const taskFormHeader = document.createElement('div');
        taskFormHeader.classList.add('task-form-header');
        taskFormHeader.innerHTML = 'New Task';
        taskForm.appendChild(taskFormHeader);

        // task form content
        const taskFormContent = document.createElement('div');
        taskFormContent.classList.add('task-form-content');
        
        // task form properties
        const formProperties = createFormProperties();
        formProperties.forEach(property => {
            taskFormContent.appendChild(property);
        });
        taskForm.appendChild(taskFormContent);

        // task form footer
        const taskFormFooter = document.createElement('div');
        taskFormFooter.classList.add('task-form-footer');

        // close task form button
        const closeTaskButton = document.createElement('input');
        closeTaskButton.type = 'button';
        closeTaskButton.classList = 'close-task';
        closeTaskButton.value = 'Close';
        taskFormFooter.appendChild(closeTaskButton);

        // add new task button
        const addTaskButton = document.createElement('input');
        addTaskButton.type = 'button';
        addTaskButton.classList.add('add-task');
        addTaskButton.value = 'Add Task';
        taskFormFooter.appendChild(addTaskButton)
        
        taskForm.appendChild(taskFormFooter);

        return taskForm;
    }

    function displayTaskForm(taskForm) {
        content.appendChild(taskForm);
    }

    function clearTaskFormFields() {
        const fields = document.querySelectorAll('.task-form-property');
        fields.forEach(field => field.value = '');
    }

    function createTaskProperties(task) {
        const taskProperties = [];
        
        const mainProperties = document.createElement('div');
        const detailProperties = document.createElement('div');
        mainProperties.classList.add('main', 'properties');
        detailProperties.classList.add('detail', 'properties', 'hidden');

        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add(property);
            if (property == 'title') {
                propertyElement.innerHTML = task[property];
                mainProperties.appendChild(propertyElement);
            } else if (property == 'dueDate') {
                propertyElement.innerHTML = format(task[property], 'MM/dd/yyyy');
                mainProperties.appendChild(propertyElement);
            } else {
                const propertyLabel = document.createElement('label');
                propertyLabel.innerHTML = `${property[0].toUpperCase() + property.slice(1)}:`;
                propertyElement.innerHTML = task[property];

                propertyLabel.appendChild(propertyElement);
                detailProperties.appendChild(propertyLabel);
            }

            taskProperties.push(mainProperties);
            taskProperties.push(detailProperties);
        });

        return taskProperties;
    }

    function createTaskElement(task) {
        const taskProperties = createTaskProperties(task);

        // create element for new task
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        
        // main content container
        const mainContent = document.createElement('div');
        mainContent.classList.add('main-content');

        // add completion status checkbox to container
        const completionStatus = document.createElement('input');
        completionStatus.classList.add('completion-status');
        completionStatus.type = 'checkbox';
        mainContent.appendChild(completionStatus);

        // add main properties to container
        mainContent.appendChild(taskProperties[0]); // main properties

        // add edit and delete icons to container
        const editTaskButton = document.createElement('span');
        const removeTaskButton = document.createElement('span');

        editTaskButton.classList.add('material-icons', 'edit-task');
        removeTaskButton.classList.add('material-icons', 'remove-task');

        editTaskButton.innerHTML = 'edit';
        removeTaskButton.innerHTML = 'delete_outline';

        mainContent.appendChild(editTaskButton);
        mainContent.appendChild(removeTaskButton);

        // add main content container to task element
        taskElement.appendChild(mainContent);

        // add detailed properties to task element (initially hidden)
        taskElement.appendChild(taskProperties[1]);

        // store task object reference in html task element
        taskElement.taskObject = task;

        return taskElement;
    }
    
    function editTaskElement() {

    }

    function createTasks(tasklist) {
        const tasks = document.createElement('div');
        tasks.classList.add('tasks');
        
        tasklist.forEach(task => {
            const taskElement = createTaskElement(task);
            tasks.appendChild(taskElement);
        });

        return tasks;
    }

    function displayTasks(tasks) {
        taskContent.prepend(tasks);
    }

    function showView(tasklist) {
        const tasks = createTasks(tasklist);
        taskContent.innerHTML = '';
        displayTasks(tasks);

        const addTaskButton = document.createElement('input');
        addTaskButton.type = 'button';
        addTaskButton.classList.add('add-task-popup');
        addTaskButton.value = 'Add Task';
        taskContent.appendChild(addTaskButton);
    }

    return {
        createDropdown,
        displayDropdown,
        createFormProperties,
        createTaskForm,
        displayTaskForm,
        clearTaskFormFields,
        createTaskProperties,
        createTaskElement,
        createTasks,
        displayTasks,
        showView,
    };
}


export { DOMTasks };