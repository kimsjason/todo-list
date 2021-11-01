import { isFuture, isToday } from "date-fns";

// in future - think about factory function inheritance
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

const Tasklist = () => {
    const tasklist = [];

    function createExampleTasks() {
        const examples = [
            Task('Walk dog', 'Daily Chores', 'Walk Ziggy before going to work', new Date(2021, 10, 1), 'medium','incomplete','#chores'),
            Task('Feed cat', 'Daily Chores', 'Feed Sweetie before studying', new Date(2021, 10, 1), 'high', 'incomplete', '#chores'),
            Task('Complete full stack Javascript', 'Work', 'Complete The Odin Project full stack Javascript course by the end of the year', new Date(2021, 11, 31), 'high', 'incomplete', '#coding'),
            Task('Review RegEx', 'Work', 'Get familiar with regular expressions', new Date(2021, 8, 20), 'low', 'incomplete', '#coding')
        ];

        // sorts examples and adds to tasklist
        examples.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
        examples.forEach(example => addTask(example));
    }
    
    function getTasklist() {
        return tasklist;
    }
    
    function addTask(task) {
        tasklist.push(task);
    }

    function removeTask(task) {
        const index = tasklist.indexOf(task);
        tasklist.splice(index, 1);
    }

    function getTodaysTasks() {
        const todaysTasks = tasklist.filter((task) => {
            return isToday(task.dueDate);
        });

        return todaysTasks;
    }

    function getUpcomingTasks() {
        const upcomingTasks = tasklist.filter((task) => {
            return isFuture(task.dueDate);
        });

        return upcomingTasks;
    }

    return {
        getTasklist,
        createExampleTasks,
        addTask,
        removeTask,
        getTodaysTasks,
        getUpcomingTasks
    }
}



export { Task, Tasklist };