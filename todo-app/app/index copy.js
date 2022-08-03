//import yargs from "yargs"; // es6

const yargs = require('yargs'); // es5 (common js)
const fs = require('fs');

// Tạo lệnh test
// node app/index.js test
yargs.command({
    command: "test",
    handler: () => {
        console.log("test");
    }
});

// CRUD
// create - node app/index.js create --title="Hoc nodejs"
yargs.command({
    command: "create",
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
        let tasks = [];
        let task = {
            id: id,
            title: title,
            description: description
        };
        const rawData = JSON.parse(fs.readFileSync("task.json"));
        rawData.forEach(item => {
            tasks.push(item);
        });
        tasks.push(task);
        let taskStr = JSON.stringify(tasks);
        
        fs.writeFile('task.json', taskStr, 'utf-8', (err) => {
            if (err) {
                throw err;
            } else {
                console.log("ghi file thành công!");
            }
        });
    }
});

// read all - node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const tasks = JSON.parse(fs.readFileSync("task.json"));
        tasks.forEach(task => {
            console.log("/---------------");
            console.log("Task ID: " + task.id);
            console.log("Task Title: " + task.title);
            console.log("Task Description: " + task.description);
            console.log("/---------------");
        });
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
        const tasks = JSON.parse(fs.readFileSync("task.json"));
        const result = tasks.find(task => task.id == id);
        if (result != undefined) {
            console.log("/---------------");
            console.log("Task ID: " + result.id);
            console.log("Task Title: " + result.title);
            console.log("Task Description: " + result.description);
            console.log("/---------------");
        } else {
            console.log("Task have id = " + id + " not found");
        }
    }
})

// update - node app/index.js update
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
        const tasks = JSON.parse(fs.readFileSync("task.json"));
        const index = tasks.findIndex(task => task.id == id);
        if (index != -1) {
            tasks[index].title = title;
            tasks[index].description = description;
            const taskStr = JSON.stringify(tasks);
            fs.writeFile('task.json', taskStr, 'utf-8', (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Task have id = " + id + " updated");
                }
            });
        } else {
            console.log("Task have id = " + id + " not found!");
        }
    }
})

// delete - node app/index.js delete
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (args) => {
        const { id } = args;
        const tasks = JSON.parse(fs.readFileSync("task.json"));
        const result = tasks.findIndex(task => task.id == id);
        if (result != -1) {
            tasks.splice(result, 1);
            const taskStr = JSON.stringify(tasks);
            fs.writeFile('task.json', taskStr, 'utf-8', (err) => {
                if (err) {
                    throw err
                } else {
                    console.log("Task have id = " + id + " deleted");
                }
            });
        } else {
            console.log("Task have id = " + id + " not found");
        }
    }
});

// Lưu lại các lệnh vừa tạo
yargs.parse();