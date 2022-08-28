const fs = require('fs');

const saveStudent = (fullName, age, nameClass) => {
    const id = Math.random();
    const student = {
        id,
        fullName,
        age,
        nameClass
    };
    const readedStudents = readAllStudents();
    if (readedStudents.status != 404) {
        const data = readedStudents.jsonStudents;
        data.push(student);      
        return handlerSaveFile(data);  
    } else {
        return readedStudents;
    }
}

const deleteStudent = (id) => {
    const readedStudents = readAllStudents();
    if (readedStudents.status != 404) {
        const data = readedStudents.jsonStudents;
        const index = data.findIndex(student => student.id == id);
        if (index > -1) {
            data.splice(index, 1);
            return handlerSaveFile(data);   
        } else {
            return {
                status: 404,
                msgError: 'Student not found!'
            }
        }
    } else {
        return readedStudents;
    }
}

const handlerSaveFile = (data) => {
    try {
        const strData = JSON.stringify(data);
        const student = fs.writeFileSync('./data/students.json', strData, 'utf-8');
        return {
            status: 200,
            student
        };
    } catch (error) {
        return {
            status: 404,
            msgError: 'An error occurred while reading the file'
        };
    }  
}

const readAllStudents = () => {
    try {
        const strStudents = fs.readFileSync('./data/students.json', 'utf-8');
        const jsonStudents = JSON.parse(strStudents);
        return {
            status: 200,
            jsonStudents
        };
    } catch (error) {
        return {
            status: 404,
            msgError: 'An error occurred while reading the file'
        };
    }      
}

module.exports = {
    saveStudent,
    readAllStudents,
    deleteStudent
}