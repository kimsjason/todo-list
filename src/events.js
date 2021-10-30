import { Task } from "./tasks";
//import { DOMTasks } from "./dom";

const Events = (dom, tasklist) => {
    //const dom = DOMTasks();
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
            dom.displayTasks();
        });
    }

    //function removeTaskEvent(task, tasklist) {
        const button = document.querySelector('.remove-task')
        console.log(button);
        button.addEventListener('click', () => {
            tasklist.removeTask(task);
            console.log('hi');
            dom.displayTasks();
        });
    //}

    function addTodayEvent(button, tasklist) {
        button.addEventListener('click', () => {
            //dom.displayTasks(tasklist.getTodaysTasks());
        })
    }


    
    return {
        addTaskEvent,
        addTodayEvent,
        //removeTaskEvent
    }
}

export { Events };