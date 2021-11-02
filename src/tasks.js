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
    const projects = {};

    function createExampleTasks() {
        const examples = [
            Task('Walk dog', 'Daily Chores', 'Walk Ziggy before going to work', new Date(2021, 10, 1), 'medium','incomplete','#chores'),
            Task('Complete full stack Javascript', 'Work', 'Complete The Odin Project full stack Javascript course by the end of the year', new Date(2021, 11, 31), 'high', 'incomplete', '#coding'),
            Task('Feed cat', 'Daily Chores', 'Feed Sweetie before studying', new Date(2021, 10, 1), 'high', 'incomplete', '#chores'),
            Task('Review RegEx', 'Work', 'Get familiar with regular expressions', new Date(2021, 8, 20), 'low', 'incomplete', '#coding'),
            Task('Test', 'Work', 'Testing the project feature', new Date(2021, 10, 3), 'high', 'incomplete', '#ugh')

        ];

        // sorts examples and adds to tasklist
        //examples.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1);
        examples.forEach(example => {
            addTask(example);
            addProject(example.projectName, example);
        });
    }
    
    function addTask(task) {
        tasklist.push(task);
    }

    function removeTask(task) {
        const index = tasklist.indexOf(task);
        tasklist.splice(index, 1);
    }

    function getTasklist() {
        return tasklist;
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

    function addProject(projectName, task) {
        if (projects[projectName]) {
            projects[projectName].push(task);
        } else {
            projects[projectName] = [task];
        }
    }

    function removeProject(projectName) {
        delete projects[projectName];

        // for later: remove tasks under this project in tasklist (for loop in this module with removeTask function?)
    }

    function getProjects() {
        return projects;
    }

    

    return {
        createExampleTasks,
        addTask,
        removeTask,
        getTasklist,
        getTodaysTasks,
        getUpcomingTasks,
        addProject,
        getProjects
    }
}



export { Task, Tasklist };