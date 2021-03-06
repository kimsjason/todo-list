import { Task } from "./tasks";
import { parseISO } from 'date-fns';

const Events = (dom, tasklist) => {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const headerName = document.querySelector('.header-name');
    const projectForm = document.querySelector('.project-form');
    const taskForm = document.querySelector('.task-form');
    const taskFormProperties = document.querySelectorAll('.task-form-property');
    let taskReference = Task();
    
    // initial task view (example tasks)
    dom.showView(tasklist.getTasklist());

    // sidebar (navigation) events
    sidebar.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'home') {
            headerName.innerHTML = 'Home';
            dom.showView(tasklist.getTasklist());
        } else if (e.target && e.target.className == 'today') {
            headerName.innerHTML = 'Today';
            dom.showView(tasklist.getTodaysTasks());
        } else if (e.target && e.target.className == 'upcoming') {
            headerName.innerHTML = 'Upcoming';
            dom.showView(tasklist.getUpcomingTasks());
        } else if (e.target && e.target.className == 'projects') {
            const dropdown = dom.createDropdown(tasklist.getProjects());
            dom.displayDropdown(dropdown);
        } else if (e.target && e.target.className == 'project-name') {
            headerName.innerHTML = e.target.innerHTML;
            dom.showView(tasklist.getProjects()[e.target.innerHTML]);
        } else if (e.target && e.target.classList.contains('delete-project')) {
            const projectName = e.target.previousSibling.innerHTML;
            tasklist.removeProject(projectName);
            const dropdown = dom.createDropdown(tasklist.getProjects());
            dom.displayDropdown(dropdown);
            dropdown.classList.remove('hidden');

            switch (headerName.innerHTML) {
                case 'Home':
                    dom.showView(tasklist.getTasklist());
                    break;
                case 'Today':
                    dom.showView(tasklist.getTodaysTasks());
                    break;
                case 'Upcoming':
                    dom.showView(tasklist.getUpcomingTasks());
                    break;
            }
        } else if (e.target && e.target.classList.contains('new-project-container')) {
            projectForm.style.display = 'flex';
        }
    });

    projectForm.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('add-project')) {
            const projectName = projectForm.querySelector('.project-form-input').value;
            tasklist.addProject(projectName);
            const dropdown = dom.createDropdown(tasklist.getProjects());
            dom.displayDropdown(dropdown);
            dropdown.classList.remove('hidden');
            projectForm.style.display = 'none'
        } else if (e.target && 
            (e.target.classList.contains('close-project') || e.target.classList.contains('close-window'))) {
                projectForm.style.display = 'none';
            }
    })

    // taskform events - add task, update task, close task
    taskForm.addEventListener('click', function(e) {
        const addTaskButton = document.querySelector('.update-task');
        if (e.target && e.target.className == 'add-task') { 
            const dueDate = taskFormProperties[2].value.split('/'); 
            // required field validation - title  & due date fields
            if (taskFormProperties[0].value == '') {
                console.log('Please enter a valid title');
            } else if (taskFormProperties[2].value == '') {
                console.log('Please enter a due date'); // ******!!!!*!*!*!*!*check how to validate correct date format and/or put calendar
            } else {
                const task = Task(
                    taskFormProperties[0].value, // title
                    taskFormProperties[1].value, // description
                    parseISO(`${dueDate[2]}-${dueDate[0]}-${dueDate[1]}`), // due date
                    taskFormProperties[3].value, // project
                    taskFormProperties[4].value, // priority
                    false // completion status unchecked
                );
                tasklist.addTask(task);
                const dropdown = dom.createDropdown(tasklist.getProjects());
                dom.displayDropdown(dropdown);
                dom.clearTaskFormFields();
                taskForm.style.display = 'none';
            }            
        } else if (e.target && e.target.classList.contains('update-task')) {
            const dueDate = taskFormProperties[2].value.split('/');
            const oldTask = taskReference;
            const newTask = Task(
                taskFormProperties[0].value, // title
                taskFormProperties[1].value, // description
                parseISO(`${dueDate[2]}-${dueDate[0]}-${dueDate[1]}`), // due date
                taskFormProperties[3].value, // project
                taskFormProperties[4].value  // priority
            )

            // check if project name is edited and if so, 
            // 1) delete task from old project and
            // 2) add updated task to the new / existing project
            // if not, just update task in place (current project)
            if (taskFormProperties[3].value != oldTask.project) {
                tasklist.removeTask(oldTask);
                tasklist.addTask(newTask);
            } else {
                tasklist.updateTask(oldTask, newTask);
            }

            // hide taskform display & add classes back
            taskForm.style.display = 'none';
            addTaskButton.classList.remove('update-task');
            addTaskButton.classList.add('add-task');
        } else if (e.target && (e.target.classList.contains('close-task') || 
                                e.target.classList.contains('close-window'))) {
            // hide taskform display, add classes back, clear form fields
            taskForm.style.display = 'none';
            addTaskButton.classList.remove('update-task');
            addTaskButton.classList.add('add-task');
            dom.clearTaskFormFields();
        } 
        
        switch (headerName.innerHTML) {
            case 'Home':
                dom.showView(tasklist.getTasklist());
                break;
            case 'Today':
                dom.showView(tasklist.getTodaysTasks());
                break;
            case 'Upcoming':
                dom.showView(tasklist.getUpcomingTasks());
                break;
            case 'Projects':
                //dom.showView(tasklist.getProjects());
                break;
            default:
                dom.showView(tasklist.getProjects()[`${headerName.innerHTML}`]);
        }
    });

    // task content events - expand detail, 'add task' popup, edit task, remove task
    content.addEventListener('click', function(e) {
        const taskFormName = document.querySelector('.task-form-name');
        if (e.target && e.target.className == 'main-content') {
            e.target.nextElementSibling.classList.toggle('hidden');
        } else if (e.target && e.target.classList.contains('add-task-popup')) {
            taskForm.style.display = 'flex';
            const addTaskButton = document.querySelector('.add-task');
            addTaskButton.value = 'Add Task';
            taskFormName.innerHTML = 'Add Task';
        } else if (e.target && e.target.classList.contains('edit-task')) {
            taskForm.style.display = 'flex';
            taskFormName.innerHTML = 'Edit Task';

            // fill in form fields with task property information
            const task = e.target.parentElement.parentElement;
            // store task reference for tasklist / project updates on existing tasks
            taskReference = task.taskObject;
            const taskProperties = task.querySelectorAll('.properties div');
            taskFormProperties.forEach(property => {
                taskProperties.forEach(taskProperty => {
                    if (taskProperty.className == property.name) {
                        property.value = taskProperty.innerHTML;
                    }
                })
            })

            // edit button text
            const addTaskButton = document.querySelector('.add-task');
            addTaskButton.classList.remove('add-task');
            addTaskButton.classList.add('update-task');
            addTaskButton.value = 'Update';
        } else if (e.target && e.target.classList.contains('remove-task')) {
            tasklist.removeTask(e.target.parentElement.parentElement.taskObject);
            
            switch (headerName.innerHTML) {
                case 'Home':
                    dom.showView(tasklist.getTasklist());
                    break;
                case 'Today':
                    dom.showView(tasklist.getTodaysTasks());
                    break;
                case 'Upcoming':
                    dom.showView(tasklist.getUpcomingTasks());
                    break;
                default:
                    // default - show specific projects
                    dom.showView(tasklist.getProjects()[`${headerName.innerHTML}`]);
            }
        } else if (e.target && e.target.classList.contains('completion-status')) {
            const task = e.target.parentElement.parentElement;
            taskReference = task.taskObject;
            const taskProperties = task.querySelectorAll('.properties div');

            // check / uncheck completion status
            if (e.target.checked) {
                //e.target.classList.add('completed');
                taskProperties.forEach(property => {
                    property.classList.add('completed');
                });
            } else {
                taskProperties.forEach(property => {
                    property.classList.remove('completed');
                });
            }

            taskReference.completionStatus = e.target.checked;
        }
    });
}

export { Events };