const fs = require('fs');

const readAllTask = () => {
  const buffer = fs.readFileSync("task.json"); // hex
  // Chuyển sang chuỗi
  const taskString = buffer.toString();
  // Chuyển sang json
  const taskJson = JSON.parse(taskString);
  return taskJson;
};

const createTask = (title, description) => {
    const newTask = {
        id: Math.random().toString(),
        title,
        description
    };
    let taskList = readAllTask();
    // taskList.push(newTask);
    // Tránh tham chiếu
    taskList = [...taskList, newTask];
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
};

const readDetailTask = (id) => {
    let taskList = readAllTask();
    const task = taskList.find(item => id === item.id);
    return task;
};

const updateTask = (id, title, description) => {
    let taskList = readAllTask();
    const index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        // thực hiện update
        const oldTask = taskList[index];
        const newTask = {...oldTask, title, description};
        taskList[index] = newTask;
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return newTask;
    } else {
        // thông báo cho người dùng biết
        return false;
    }
}

const deleteTask = (id) => {
    let taskList = readAllTask();
    const index = taskList.findIndex(task => task.id === id);
    if (index !== -1) {
        const task = taskList[index];
        taskList = taskList.filter((task) => task.id !== id);
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return task;
    } else {
        return false;
    }
}

module.exports = {
    readAllTask,
    createTask,
    readDetailTask,
    updateTask,
    deleteTask
}