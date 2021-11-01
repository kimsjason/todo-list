import { Task } from "./tasks";

const Events = (dom, tasklist) => {
    const content = document.querySelector('.content');
    content.addEventListener('click', function(e) {
        if (e.target && e.target.className == 'remove-task') {
            tasklist.removeTask(e.target.reference);
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
        dom.displayTasks();
    })

    function addTodayEvent(button, tasklist) {
        button.addEventListener('click', () => {
            //dom.displayTasks(tasklist.getTodaysTasks());
        })
    }
}

export { Events };