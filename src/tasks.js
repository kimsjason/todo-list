// in future - think about factory function inheritance
const Tasklist = () => {
    const tasklist = [];

    function addTask(task) {
        tasklist.push(task);
    }

    function removeTask(task) {
        const index = tasklist.indexOf(task);
        tasklist.splice(index, 1);
    }

    return {
        tasklist,
        addTask,
        removeTask,
    }
}

const Task = (title, projectName, description, dueDate, priority, complete, hashtags) => {

    return {
        title,
        projectName,
        description,
        dueDate,
        priority,
        complete,
        hashtags,
    }
}

export { Tasklist, Task };