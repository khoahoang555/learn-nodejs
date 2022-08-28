const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');
const { saveStudent, readAllStudents, deleteStudent } = require('./module/handler_students');
const port = 3000;

const index_page = fs.readFileSync(`${__dirname}/pages/index_page.html`, 'utf-8');
const form_page = fs.readFileSync(`${__dirname}/pages/form_page.html`, 'utf-8');
const table_page = fs.readFileSync(`${__dirname}/pages/table_page.html`, 'utf-8');
const student_item = fs.readFileSync(`${__dirname}/pages/student_item.html`, 'utf-8');
const error_page = fs.readFileSync(`${__dirname}/pages/404_page.html`, 'utf-8');
const not_found_page = fs.readFileSync(`${__dirname}/pages/not_found_page.html`, 'utf-8');


const server = http.createServer((req, resp) => {
    const { query, pathname } = url.parse(req.url, true); 
    resp.writeHead(200, {'Content-type': 'text/html'}); 
    if ((pathname === '/index') || (pathname === '/')) { 
        resp.end(index_page);
    } else if (pathname === '/table') {
        let output = '';
        const data = readAllStudents();
        const listStudents = data.jsonStudents;
        listStudents.forEach((student, index) => {
            output = output + student_item.replace("{%STT%}", (index + 1));
            output = output.replace("{%FULLNAME%}", student.fullName);
            output = output.replace("{%AGE%}", student.age);
            output = output.replace("{%CLASS%}", student.nameClass);       
            output = output.replaceAll("{%ID%}", student.id);  
        });
        output = table_page.replace("{%LIST_STUDENTS%}", output);
        resp.end(output);
    } else if (pathname === '/form') {
        if (req.method == 'POST') {
            let body = "";
            let data = "";
            req.on('data', item => {
                body += item;
            });
            req.on('end', () => {
                data = querystring.parse(body);
                const { fullName, age, nameClass } = data;
                const savedStudent = saveStudent(fullName, age, nameClass);
                if (savedStudent.status != 404) {
                    resp.writeHead(302, {
                        'Location': '/table'
                    });
                    resp.end();
                } else {
                    const output = error_page.replace("{%MSGERROR%}", savedStudent.msgError);
                    resp.end(output);
                }
            });         
        } else {
            resp.end(form_page);
        }    
    } else if (pathname === '/delete') {
        const id = query.id;
        const deletedStudent = deleteStudent(id);
        if (deletedStudent.status != 404) {
            resp.writeHead(302, {
                'Location': '/table'
            });
            resp.end();
        } else {
            const output = error_page.replace("{%MSGERROR%}", deletedStudent.msgError);
            resp.end(output);
        }
    } else {
        resp.end(not_found_page);
    }
});

server.listen(port, () => {
    console.log('App running on port 3000');
});