import {add, format } from 'date-fns';
import { el } from 'date-fns/locale';

const DOMTasks = () => {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const taskContent = document.querySelector('.task-content');

    const properties = ['title', 'description', 'dueDate', 'project', 'priority'];
    
    displayProjectForm(createProjectForm());
    displayTaskForm(createTaskForm())

    function createDropdown(projects) {
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('hidden');
        dropdown.innerHTML = '';

        Object.keys(projects).forEach(project => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');
            
            const projectName = document.createElement('div');
            projectName.classList.add('project-name');
            projectName.innerHTML = project;

            const deleteProject = document.createElement('span');
            deleteProject.classList.add('material-icons', 'delete-project');
            deleteProject.innerHTML = 'close';

            projectContainer.appendChild(projectName);
            projectContainer.appendChild(deleteProject);

            dropdown.appendChild(projectContainer);
        });

        const newProjectContainer = document.createElement('div');
        newProjectContainer.classList.add('new-project-container');

        const newProjectButton = document.createElement('span');
        newProjectButton.classList.add('material-icons', 'new-project-button');
        newProjectButton.innerHTML = 'add';

        const newProject = document.createElement('div');
        newProject.classList.add('new-project')
        newProject.innerHTML = 'New Project';

        newProjectContainer.appendChild(newProjectButton);
        newProjectContainer.appendChild(newProject);

        dropdown.appendChild(newProjectContainer);

        return dropdown;
    }

    function displayDropdown(dropdown) {
        sidebar.appendChild(dropdown);
    }

    function createProjectForm() {
        // project form 
        const projectForm = document.createElement('div');
        projectForm.classList.add('project-form');

        // project form header
        const projectFormHeader = document.createElement('div');
        projectFormHeader.classList.add('project-form-header');

        const projectFormName = document.createElement('div');
        projectFormName.classList.add('project-form-name');
        projectFormName.innerHTML = 'New Project';
        projectFormHeader.appendChild(projectFormName);

        const closeWindow = document.createElement('span');
        closeWindow.classList.add('material-icons', 'close-window');
        closeWindow.innerHTML = 'close';

        projectFormHeader.appendChild(closeWindow);

        // project form content
        const projectFormContent = document.createElement('div');
        projectFormContent.classList.add('project-form-content');

        const projectFormLabel = document.createElement('div');
        projectFormLabel.classList.add('project-form-label');
        projectFormLabel.innerHTML = 'Name:';
         
        const projectFormInput = document.createElement('input');
        projectFormInput.classList.add('project-form-input');
        projectFormInput.type = 'text';

        projectFormContent.appendChild(projectFormLabel);
        projectFormContent.appendChild(projectFormInput);

        // project form footer
        const projectFormFooter = document.createElement('div');
        projectFormFooter.classList.add('project-form-footer');

        const closeProjectButton = document.createElement('input');
        closeProjectButton.type = 'button';
        closeProjectButton.classList = 'close-project';
        closeProjectButton.value = 'Close';
        projectFormFooter.appendChild(closeProjectButton);

        // add new task button
        const addProjectButton = document.createElement('input');
        addProjectButton.type = 'button';
        addProjectButton.classList.add('add-project');
        addProjectButton.value = 'Add Project';
        projectFormFooter.appendChild(addProjectButton)

        // append header, content, and footer to project form
        projectForm.appendChild(projectFormHeader);
        projectForm.appendChild(projectFormContent);
        projectForm.appendChild(projectFormFooter);

        return projectForm;
    }

    function displayProjectForm(projectForm) {
        content.appendChild(projectForm);
    }

    function createFormProperties() {
        const formProperties = [];
        
        properties.forEach(property => {
            const propertyContainer = document.createElement('div');
            const propertyName = document.createElement('div');

            propertyContainer.classList.add('property-container', property);
            propertyName.classList.add('property-name');
            propertyContainer.appendChild(propertyName);

            // give description a textarea
            if (property == 'description') {
                const propertyElement = document.createElement('textarea');
                propertyElement.classList.add('task-form-property');
                propertyContainer.appendChild(propertyElement);
            } 
            // give priority high, medium, low options
            else if (property == 'priority') {
                const propertyElement = document.createElement('select');
                propertyElement.classList.add('task-form-property');

                const options = ['Low', 'Medium', 'High'];
                options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.innerHTML = option;
                    propertyElement.appendChild(optionElement);
                });  
                propertyContainer.appendChild(propertyElement);
            } else {
                const propertyElement = document.createElement('input');
                propertyElement.classList.add('task-form-property');
                propertyElement.type = 'text';
                propertyElement.name = property;
                propertyContainer.appendChild(propertyElement);
            }

            // capitalize property names
            if (property == 'dueDate') {
                propertyName.innerHTML = 'Due Date';
            } else {
                propertyName.innerHTML = property[0].toUpperCase() + property.slice(1);
            }




            formProperties.push(propertyContainer);
        });

        return formProperties;
    }

    function createTaskForm() {
        // task form
        const taskForm = document.createElement('div');
        taskForm.classList.add('task-form');

        // task form header - innerHTML filled out in events (add or edit task)
        const taskFormHeader = document.createElement('div');
        taskFormHeader.classList.add('task-form-header');

        // task form name
        const taskFormName = document.createElement('div');
        taskFormName.classList.add('task-form-name');
        taskFormHeader.appendChild(taskFormName);

        // close task form window
        const closeWindow = document.createElement('span');
        closeWindow.classList.add('material-icons', 'close-window');
        closeWindow.innerHTML = 'close';

        taskFormHeader.appendChild(closeWindow);
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
        const mainProperties = taskProperties[0].children;
        const detailProperties = taskProperties[1].children;

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
        completionStatus.checked = task.completionStatus;

        // add 'completed' class to tasks that are checked - class adds strikethrough styles to all task properties
        if (completionStatus.checked) {
            for (let i = 0; i < mainProperties.length; i++) {
                mainProperties[i].classList.add('completed')
            };
            for (let i = 0; i < detailProperties.length; i++) {
                detailProperties[i].classList.add('completed')
            };
        }

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

        // add priority value as a task class
        taskElement.classList.add(task.priority.toLowerCase());

        // store task object reference in html task element
        taskElement.taskObject = task;

        return taskElement;
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