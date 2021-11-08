import { Task } from "./tasks";
import { parseISO } from 'date-fns';

const Events = (dom, tasklist) => {
    const sidebar = document.querySelector('.sidebar');
    const taskContent = document.querySelector('.task-content');
    const headerName = document.querySelector('.header-name');
    const taskForm = document.querySelector('.task-form');
    const taskFormContent = document.querySelector('.task-form-content');

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

    // taskform events - add task
    taskForm.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'add-task') {
            
            const dueDate = taskFormContent.children[2].children[1].value.split('/');
            
            if (taskFormContent.children[0].value == '') { // empty title field
                console.log('Please enter a valid title');
            } else if (taskFormContent.children[3].value == '') { // empty due date field
                console.log('Please enter a due date'); // check how to validate correct date format and/or put calendar
            } else {
                const task = Task(
                    taskFormContent.children[0].children[1].value, // title
                    taskFormContent.children[1].children[1].value, // description
                    parseISO(`${dueDate[2]}-${dueDate[0]}-${dueDate[1]}`), // due date
                    taskFormContent.children[3].children[1].value, // project
                    taskFormContent.children[4].children[1].value, // priority
                );
                tasklist.addTask(task);
                tasklist.addProject(task.project, task);
                const dropdown = dom.createDropdown(tasklist.getProjects());
                dom.displayDropdown(dropdown);
            }            
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
        }
    });

    // task events - expand detail, remove task
    taskContent.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'main-content') {
            e.target.nextElementSibling.classList.toggle('hidden');
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
            const properties = ['title', 'project', 'description', 'dueDate', 'priority', 'hashtags'];
            const details = e.target.parentElement.nextElementSibling;

            if (details.classList.contains('hidden')) {
                // make details visible
                details.classList.remove('hidden');
                // replace property field divs with inputs for user editing
                properties.forEach(property => {
                    const element = e.target.parentElement.parentElement.querySelector(`.${property}`);
                    const input = document.createElement('input');
                    input.classList.add(property);
                    input.value = element.innerHTML;
                    input.style.pointerEvents = 'auto';
                    element.replaceWith(input);
                });
                // Add button to update task
                const updateTask = document.createElement('input');
                updateTask.type = 'button';
                updateTask.classList.add('update-task');
                updateTask.value = 'Update Task';
                details.appendChild(updateTask);
            } else {
                // hide details
                details.classList.add('hidden');
                // turn input values back into property field divs
                properties.forEach(property => {
                    const element = e.target.parentElement.parentElement.querySelector(`.${property}`);
                    console.log(element);
                    const div = document.createElement('div');
                    div.classList.add(property);
                    div.innerHTML = element.value;
                    div.style.pointerEvents = 'none';
                    element.replaceWith(div);
                });
            }
        } else if (e.target && e.target.classList.contains('update-task')) {
            const oldTask = e.target.parentElement.parentElement;
            console.log(oldTask);
            const mainProperties = '';
            const detailProperties = oldTask.children[1].children[0].children[0].value;
            console.log(detailProperties);
            const newTask = Task(
                detailProperties

            )
            tasklist.updateTask(oldTask.taskObject, newTask);
        }
    });
    


}

export { Events };