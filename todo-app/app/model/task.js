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
    console.log(newTask);
}

module.exports = {
    readAllTask,
    createTask
}