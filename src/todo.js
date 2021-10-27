const todo = () => {
    const list = [];

    function addItem(item) {
        list.push(item);
    }

    function removeItem(item) {
        const index = list.indexOf(item);
        list.splice(index, 1);
    }

    return {
        list,
        addItem,
        removeItem
    }
}

const todoItem = (title, projectName, description, dueDate, priority, status, hashtags) => {

    return {
        title,
        projectName,
        description,
        dueDate,
        priority,
        status,
        hashtags,
    }
}

export { todo, todoItem };