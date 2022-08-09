const express = require('express');

const { getWeather } = require('../src/utils/getWeather');
const app = express();
const path = require("path");
const pathPublic = path.join(__dirname, "../public");
app.use(express.static(pathPublic));

app.get("/", async (req, resp) => {
    const params = req.query;
    const location = params.address;
    const weather = await getWeather(location);
    if (location) {
        resp.render("weather", {
            status: true,
            region: weather.region,
            country: weather.country,
            temperature: weather.temperature,
            wind_speed: weather.wind_speed,
            precip: weather.precip,
            cloudcover: weather.cloudcover 
        });
    } else {
        resp.render("weather", {
            status: false
        });
    }
    
});

app.set("view engine", "hbs");

const port = 7000;
app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
})
