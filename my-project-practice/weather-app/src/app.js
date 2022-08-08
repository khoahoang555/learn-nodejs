const express = require('express');
const path = require('path');
const { getWeather } = require('./model/getWeather');

const app = express();
const pathPublic = path.join(__dirname, '../public');
app.use(express.static(pathPublic));

app.get('/', async (req, resp) => {
    const location = req.query.location;
    if (location) {
        const weather = await getWeather(location);
        if (weather) {
            resp.render('index', {
                status: true,
                location,
                temperature: weather.temperature,
                statusWeather: weather.status,
                icon: weather.icon,
                humidity: weather.humidity,
                windSpeed: weather.windSpeed
            });
        } else {
            // catch error could not found address
            resp.render('index', {
                status: false
            });
        }
    } else {
        // catch error not input field search
        resp.render('index', {
            status: false
        });
    }

});

app.set('view engine', 'hbs');

const port = 7000;
app.listen(port, () => {
    console.log(`app running on port ${port}`)
});
