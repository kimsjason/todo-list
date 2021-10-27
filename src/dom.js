

const domItem = (item) => {
    // list item element
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');

    // list item property elements
    const title = document.createElement('div');
    const projectName = document.createElement('div');
    const description = document.createElement('div');
    const dueDate = document.createElement('div');
    const priority = document.createElement('div');
    const status = document.createElement('div');
    const hashtags = document.createElement('div');

    title.classList.add('title');
    projectName.classList.add('project-name');
    description.classList.add('description');
    dueDate.classList.add('due-date');
    priority.classList.add('priority');
    status.classList.add('status');
    hashtags.classList.add('hashtags');

    title.innerHTML = item.title;
    projectName.innerHTML = item.projectName;
    description.innerHTML = item.description;
    dueDate.innerHTML = item.dueDate;
    priority.innerHTML = item.priority;
    status.innerHTML = item.status;
    hashtags.innerHTML = item.hashtags;

    listItem.appendChild(title);
    listItem.appendChild(projectName);
    listItem.appendChild(description);
    listItem.appendChild(dueDate);
    listItem.appendChild(priority);
    listItem.appendChild(status);
    listItem.appendChild(hashtags);

    return listItem;
}


export { domItem };