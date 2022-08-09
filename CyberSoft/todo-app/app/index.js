//import yargs from "yargs"; // es6

const yargs = require('yargs'); // es5 (common js)
const { readAllTask, createTask, readDetailTask, updateTask, deleteTask } = require('./model/task');
const chalk = require("chalk");

// Tạo lệnh test
// node app/index.js test
yargs.command({
    command: "test",
    handler: () => {
        console.log("test");
    }
});

// CRUD
// create - node app/index.js create --title="Hoc nodejs" --description="Dau khoa lam dau"
yargs.command({
    command: "create",
    builder: {
        title: {
            type: "string"
        },
        description: {
            type: "string"
        }
    },
    handler: (args) => {
        const { title, description } = args;
        const newTask = createTask(title, description);
        console.log("Đã tạo mới công việc thành công: ", newTask);
    }
});

// read all - node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const result = readAllTask();
        console.log(chalk.blue("taskJson: "), result);
    }
});

// read detail - node app/index.js read-detail --id="123"
yargs.command({
    command: "read-detail",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id } = args; 
        const task = readDetailTask(id);
        if (task) {
            console.log("task : ", task);
        } else {
            console.log(chalk.red("Not found!"));
        }
    }
});

// update - node app/index.js update --id="1" --title="Python" --description="Is programming language"
yargs.command({
    command: "update",
    builder: {
        id: {
            type: "string"
        }, 
        title: {
            type: "string"
        },
        description: {
            type: "string"
        } 
    },
    handler: (args) => {
        const { id, title, description } = args;
        const task = updateTask(id, title, description);
        if (task) {
            console.log("task updated : ", task);
        } else {
            console.log("Not found!");
        }
    }
})

// delete - node app/index.js delete --id="1"
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id } = args;
        const task = deleteTask(id);
        if (task) {
            console.log("delete task : ", task);
        } else {
            console.log("Not found!");
        }
    }
});

// Lưu lại các lệnh vừa tạo
yargs.parse();