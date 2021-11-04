import { Task } from "./tasks";
import { parseISO } from 'date-fns';

const Events = (dom, tasklist) => {
    const content = document.querySelector('.content');
    const headerName = document.querySelector('.header-name');
    const sidebar = document.querySelector('.sidebar');
    const taskContent = document.querySelector('.task-content');
    const taskform = document.querySelector('.task-form');

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
            dom.updateDropdown(tasklist.getProjects());
        } else if (e.target && e.target.className == 'dropdown-items') {
            headerName.innerHTML = e.target.innerHTML;
            dom.showView(tasklist.getProjects()[e.target.innerHTML]);
        }
    });

    taskform.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'add-task') {
            const taskForm = document.querySelector('.task-form');
            const dueDate = taskForm.children[3].value.split('/');
            
            const task = Task(
                taskForm.children[0].value, // title
                taskForm.children[1].value, // project name
                taskForm.children[2].value, // description
                parseISO(`${dueDate[2]}-${dueDate[0]}-${dueDate[1]}`), // due date
                taskForm.children[4].value, // priority
                taskForm.children[5].value, // complete
                taskForm.children[6].value  // hashtags            
            );
            tasklist.addTask(task);
            tasklist.addProject(task.projectName, task);
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
                //dom.displayTasks(tasklist.getProjects());
        }
    });

    taskContent.addEventListener('click', function(e) {
        console.log('taskcontent was clicked');
        if (e.target && e.target.className == 'main-properties') {
            e.target.nextElementSibling.classList.toggle('hidden');
        } else if (e.target && e.target.className == 'remove-task') {
            tasklist.removeTask(e.target.parentElement.taskObject);
        }
    });
    


}

export { Events };