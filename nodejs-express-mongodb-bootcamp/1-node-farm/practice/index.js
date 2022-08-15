const http = require('http');
const fs = require('fs');
const port = 3000;

const index_page = fs.readFileSync(`${__dirname}/pages/index_page.html`, 'utf-8');

const server = http.createServer((req, resp) => {
    const {url} = req; 
    if ((url === '/index') || (url === '/')) {
        resp.writeHead(200, {'Content-type': 'text/html'});
        resp.end(index_page);
    } else if (url === '/table') {

    } else if (url === '/form') {
        
    }
});

server.listen(port, () => {
    console.log('App running on port 3000');
});