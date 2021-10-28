import { Task } from "./tasks";
import { DOMTasks } from "./dom";

const Events = () => {
    const dom = DOMTasks();
    function addTaskEvent(button, tasklist, taskForm) {
        button.addEventListener('click', () => {
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
            dom.displayTasks(tasklist);
        });
    }

    // function removeTaskEvent(button, task, tasklist) {
    //     button.addEventListener('click', () => {
    //         tasklist.removeTask(task);
    //         dom.displayTasks(tasklist);
    //     });
    // }
    
    return {
        addTaskEvent,
        //removeTaskEvent
    }
}

export { Events };