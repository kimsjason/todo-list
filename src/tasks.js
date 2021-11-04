import { isFuture, isToday, parseISO } from "date-fns";

// in future - think about factory function inheritance
const Task = (title, project, description, dueDate, priority, complete, hashtags) => {

    return {
        title,
        project,
        description,
        dueDate,
        priority,
        complete,
        hashtags,
    }
}

const Tasklist = () => {
    const tasklist = [
        Task('Walk dog', 'Daily Chores', 'Walk Ziggy before going to work', parseISO('2021-11-03'), 'medium','incomplete','#chores'),
        Task('Complete full stack Javascript', 'Work', 'Complete The Odin Project full stack Javascript course by the end of the year', parseISO('2021-11-30'), 'high', 'incomplete', '#coding'),
        Task('Feed cat', 'Daily Chores', 'Feed Sweetie before studying', parseISO('2021-10-02'), 'high', 'incomplete', '#chores'),
        Task('Review RegEx', 'Work', 'Get familiar with regular expressions', parseISO('2021-08-20'), 'low', 'incomplete', '#coding'),
        Task('Test', 'Work', 'Testing the project feature', parseISO('2021-10-03'), 'high', 'incomplete', '#ugh')
    ];
    
    const projects = {};

    tasklist.forEach(example => {
        addProject(example.project, example);
    });
    

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
        getTasklist,
        getTodaysTasks,
        getUpcomingTasks,
        addProject,
        getProjects,
    }
}



export { Task, Tasklist };