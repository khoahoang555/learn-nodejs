const express = require('express');
const path = require('path');

const app = express();
const pathPublic = path.join(__dirname, '../public');
app.use(express.static(pathPublic));

app.get('/', (req, resp) => {
    resprender('index');
});

app.set('view engine', 'hbs');

const port = 7000;
app.listen(port, () => {
    console.log(`app running on port ${port}`)
});
