import { Task } from "./tasks";
import { parseISO } from 'date-fns';

const Events = (dom, tasklist) => {
    const sidebar = document.querySelector('.sidebar');
    const taskContent = document.querySelector('.task-content');
    const headerName = document.querySelector('.header-name');
    const taskForm = document.querySelector('.task-form');
    const taskFormProperties = document.querySelectorAll('.task-form-property');

    let taskReference = Task();

    // sidebar navigation events
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
            headerName.innerHTML = 'Projects';
            const dropdown = dom.createDropdown(tasklist.getProjects());
            dom.displayDropdown(dropdown);
        } else if (e.target && e.target.className == 'dropdown-items') {
            headerName.innerHTML = e.target.innerHTML;
            dom.showView(tasklist.getProjects()[e.target.innerHTML]);
        }
    });

    // TASKFORM EVENTS - add task, update task, close task
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
                );
                tasklist.addTask(task);
                const dropdown = dom.createDropdown(tasklist.getProjects());
                dom.displayDropdown(dropdown);
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
        } else if (e.target && e.target.classList.contains('close-task')) {
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

    // task events - expand detail, remove task
    taskContent.addEventListener('click', function(e) {
        const taskFormHeader = document.querySelector('.task-form-header');
        if (e.target && e.target.className == 'main-content') {
            e.target.nextElementSibling.classList.toggle('hidden');
        } else if (e.target && e.target.classList.contains('add-task-popup')) {
            taskForm.style.display = 'flex';
            const addTaskButton = document.querySelector('.add-task');
            addTaskButton.value = 'Add Task';
            taskFormHeader.innerHTML = 'Add Task';
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
                case 'Projects':
                    console.log(tasklist.getProjects()['Daily Chores']);
                    break;
                default:
                    // default - show specific projects
                    dom.showView(tasklist.getProjects()[`${headerName.innerHTML}`]);
            }
        } else if (e.target && e.target.classList.contains('edit-task')) {
            taskForm.style.display = 'flex';
            taskFormHeader.innerHTML = 'Edit Task';

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
        }
    });
    


}

export { Events };