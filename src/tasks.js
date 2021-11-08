import { isFuture, isToday, parseISO } from "date-fns";

// in future - think about factory function inheritance
const Task = (title, description, dueDate, project, priority) => {

    return {
        title,
        description,
        dueDate,
        project,
        priority
    }
}

const Tasklist = () => {
    const tasklist = [
        Task('Walk dog', 'Walk Ziggy before going to work', parseISO('2021-11-03'), 'Daily Chores', 'medium'),
        Task('Complete full stack Javascript', 'Complete The Odin Project full stack Javascript course by the end of the year', parseISO('2021-11-30'), 'Work', 'high'),
        Task('Feed cat', 'Feed Sweetie before studying', parseISO('2021-10-02'), 'Daily Chores', 'high'),
        Task('Review RegEx', 'Get familiar with regular expressions', parseISO('2021-08-20'), 'Work', 'low'),
        Task('Test', 'Testing the project feature', parseISO('2021-10-03'), 'Work', 'high')
    ];
    
    const projects = {};

    tasklist.forEach(example => {
        addProject(example.project, example);
    });
    

    function addTask(task) {
        tasklist.push(task);
    }

    function removeTask(task) {
        // remove task from tasklist
        const taskIndex = tasklist.indexOf(task);
        tasklist.splice(taskIndex, 1);

        // remove task from projects
        const projectIndex = projects[task.project].indexOf(task);
        projects[task.project].splice(projectIndex, 1);
    }

    function updateTask(oldTask, newTask) {
        const taskIndex = tasklist.indexOf(oldTask);
        tasklist.splice(taskIndex, 1, newTask)
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

    function addProject(project, task) {
        if (projects[project]) {
            projects[project].push(task);
        } else {
            projects[project] = [task];
        }
    }

    function removeProject(project) {
        delete projects[project];

        // for later: remove tasks under this project in tasklist (for loop in this module with removeTask function?)
    }

    function getProjects() {
        return projects;
    }


    return {
        addTask,
        removeTask,
        updateTask,
        getTasklist,
        getTodaysTasks,
        getUpcomingTasks,
        addProject,
        getProjects,
    }
}



export { Task, Tasklist };