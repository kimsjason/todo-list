import { Task } from "./tasks";

const Events = (dom, tasklist) => {
    const content = document.querySelector('.content');
    content.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'remove-task') {
            tasklist.removeTask(e.target.parentElement.taskObject);            
        } else if (e.target && e.target.className == 'add-task') {
            const taskForm = document.querySelector('.task-form');
            const task = Task(
                taskForm.children[0].value, // title
                taskForm.children[1].value, // project name
                taskForm.children[2].value, // description
                taskForm.children[3].value, // due date
                taskForm.children[4].value, // priority
                taskForm.children[5].value, // complete
                taskForm.children[6].value  // hashtags            
            );
            tasklist.addTask(task);
        } 

        dom.displayTasks(tasklist.getTasklist());
    })

    const sidebar = document.querySelector('.sidebar');
    sidebar.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'today') {
            console.log(tasklist.getTasklist());
            dom.displayTasks(tasklist.getTodaysTasks());
        } else if (e.target && e.target.className == 'upcoming') {
            dom.displayTasks(tasklist.getUpcomingTasks());
        }
    }) 
}

export { Events };